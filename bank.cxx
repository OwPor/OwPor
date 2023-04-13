#include <iostream>
#include <fstream>
#include <string>
#include <vector>

using namespace std;

// Structure to hold user data
struct User
{
    string username;
    string password;
    double balance;
};

// Function prototypes
void update_balance(string username, double balance);
void registerUser(vector<User> &users);
void loginUser(vector<User> &users, User &currentUser);
void deposit(User &currentUser);
void withdraw(User &currentUser);
void transfer(vector<User> &users, User &currentUser);
void checkBalance(const User &currentUser);
void saveUserData(const vector<User> &users);

vector<User> users;

int main()
{
    User currentUser;
    int choice;

    // Load user data from file
    ifstream fin("users.txt");
    if (fin.is_open())
    {
        User user;
        while (fin >> user.username >> user.password >> user.balance)
        {
            users.push_back(user);
        }
        fin.close();
    }

    do
    {
        cout << "Welcome to Vince's Bank! \nPlease choose an option:\n"
             << "1. Register\n"
             << "2. Login\n"
             << "3. Exit\n"
             << "Enter choice: ";
        cin >> choice;

        switch (choice)
        {
        case 1:
            registerUser(users);
            break;
        case 2:
            loginUser(users, currentUser);
            if (currentUser.username != "")
            {
                do
                {
                    cout << "\nPlease choose an option:\n"
                         << "1. Deposit\n"
                         << "2. Withdraw\n"
                         << "3. Transfer\n"
                         << "4. Check Balance\n"
                         << "5. Logout\n"
                         << "Enter choice: ";
                    cin >> choice;

                    switch (choice)
                    {
                    case 1:
                        deposit(currentUser);
                        break;
                    case 2:
                        withdraw(currentUser);
                        break;
                    case 3:
                        transfer(users, currentUser);
                        break;
                    case 4:
                        checkBalance(currentUser);
                        break;
                    case 5:
                        // Logout
                        currentUser.username = "";
                        currentUser.password = "";
                        currentUser.balance = 0.0;
                        system("cls");
                        break;
                    default:
                        cout << "Invalid choice. Please try again.\n";
                        break;
                    }
                } while (choice != 5);
            }
            break;
        case 3:
            // Save user data to file
            saveUserData(users);
            break;
        default:
            cout << "Invalid choice. Please try again.\n";
            break;
        }
    } while (choice != 3);

    return 0;
}

// Function to register a new user
void registerUser(vector<User> &users)
{
    User user;
    cout << "Please enter a username: ";
    cin >> user.username;
    for (const User &u : users)
    {
        if (u.username == user.username)
        {
            cout << "Username already exists. Please choose a different one.\n";
            return;
        }
    }
    cout << "Please enter a password: ";
    cin >> user.password;
    user.balance = 0.0;

    ofstream outfile("users.txt", ios::app);
    outfile << "\n" << user.username << " " << user.password << " " << user.balance;
    outfile.close();

    users.push_back(user);
    system("cls");
    cout << "User registered successfully!\n";
}

// Function to login a user
void loginUser(vector<User> &users, User &currentUser)
{
    string username, password;
    cout << "Please enter your username: ";
    cin >> username;
    cout << "Please enter your password: ";
    cin >> password;
    for (const User &user : users)
    {
        if (user.username == username && user.password == password)
        {
            system("cls");
            cout << "User logged in successfully!";
            currentUser = user;
            return;
        }
    }
    system("cls");
    cout << "Invalid username or password. Please try again.\n";
}

// Function to deposit money to the current user's account
void deposit(User &currentUser)
{
    double amount;
    cout << "Please enter the amount to deposit: ";
    cin >> amount;
    if (amount <= 0)
    {
        cout << "Invalid amount. Please try again.\n";
        return;
    }
    currentUser.balance += amount;

    update_balance(currentUser.username, currentUser.balance);

    cout << "Deposit successful. New balance: " << currentUser.balance << "\n";
}

// Function to withdraw money from the current user's account
void withdraw(User &currentUser)
{
    double amount;
    cout << "Please enter the amount to withdraw: ";
    cin >> amount;
    if (amount <= 0)
    {
        cout << "Invalid amount. Please try again.\n";
        return;
    }
    if (amount > currentUser.balance)
    {
        cout << "Insufficient balance. Please try again.\n";
        return;
    }
    currentUser.balance -= amount;

    update_balance(currentUser.username, currentUser.balance);

    cout << "Withdrawal successful. New balance: " << currentUser.balance << "\n";
}

// Function to transfer money from the current user's account to another user's account
void transfer(vector<User> &users, User &currentUser)
{
    string username;
    double amount;
    cout << "Please enter the username to transfer to: ";
    cin >> username;
    if (username == currentUser.username)
    {
        cout << "You cannot transfer to yourself. Please try again.\n";
        return;
    }
    User *recipient = nullptr;
    for (User &user : users)
    {
        if (user.username == username)
        {
            recipient = &user;
            break;
        }
    }
    if (recipient == nullptr)
    {
        cout << "User not found. Please try again.\n";
        return;
    }
    cout << "Please enter the amount to transfer: ";
    cin >> amount;
    if (amount <= 0)
    {
        cout << "Invalid amount. Please try again.\n";
        return;
    }
    if (amount > currentUser.balance)
    {
        cout << "Insufficient balance. Please try again.\n";
        return;
    }
    currentUser.balance -= amount;
    recipient->balance += amount;

    update_balance(currentUser.username, currentUser.balance);
    update_balance(username, recipient->balance);

    cout << "Transfer successful. New balance: " << currentUser.balance << "\n";
}

// Function to check the current user's account balance
void checkBalance(const User &currentUser)
{
    cout << "Current balance: " << currentUser.balance << "\n";
}

// Function to save all the user data to a file

void saveUserData(const vector<User> &users)
{
    ofstream fout("users.txt");
    if (!fout)
    {
        cout << "Error opening file.\n";
        return;
    }

    for (auto user : users)
    {
        fout << user.username << " " << user.password << " " << user.balance << "\n";
    }

    fout.close();
}

void loadUserData()
{
    ifstream fin("users.txt");
    if (!fin)
    {
        cout << "Error opening file.\n";
        return;
    }

    User user;
    while (fin >> user.username >> user.password >> user.balance)
    {
        users.push_back(user);
    }

    fin.close();
}

// Function to update user's balance in the file
void update_balance(string username, double balance)
{
    fstream file;
    file.open("users.txt", ios::in | ios::out);
    string line;
    bool found = false;
    while (file >> line)
    {
        if (line == username)
        {
            string password;
            file >> password;                                              // read the password
            file.seekp(-(line.size() + password.size() + 1), ios::cur);    // move the file pointer back to overwrite the balance
            file << username << " " << password << " " << balance << endl; // write the new balance to the file
            found = true;
            break;
        }
    }

    //if (!found) {
    //        file.clear();
    //        file.seekp(0, ios::end);
    //        file << username << " " << balance << endl; // if the user is not found, add a new line to the end of the file
    //    }

    file.close();
}
