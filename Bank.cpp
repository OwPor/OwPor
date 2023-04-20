#include <iostream>
#include <fstream>
#include <string>
#include <vector>
using namespace std;

bool loggedIn = false;

struct BankAccount
{
    string username;
    string password;
    double balance;
};

vector<BankAccount> readAccounts()
{
    vector<BankAccount> accounts;
    ifstream inFile("accounts.txt", ios::in);

    if (inFile)
    {
        string username, password;

        while (inFile >> username >> password)
        {
            BankAccount account = {
                username,
                password};
            accounts.push_back(account);
        }

        inFile.close();
    }

    return accounts;
}

void writeAccounts(const vector<BankAccount> &accounts, double createBalance, string un)
{
    ofstream outfile("accounts.txt", ios::out);

    if (!outfile)
    {
        cerr << "Error: could not open file" << endl;
        exit(1);
    }

    for (const auto &account : accounts)
    {
        outfile << account.username << " " << account.password << endl;
    }

    outfile.close();

    string user = un + ".txt";

    ofstream edit;
    edit.open(user, ios::out);
    edit << createBalance;
    edit.close();
}

void updateBalanceInFile(double newBalance, BankAccount &currentAccount)
{
    string user = currentAccount.username + ".txt";

    ofstream edit;
    edit.open(user, ios::out);
    edit << newBalance;
    edit.close();
}

void updateBalanceOthers(string username, double otherBalance)
{
    string user = username + ".txt";

    ofstream edit;
    edit.open(user, ios::out);
    edit << otherBalance;
    edit.close();
}

// Function to find an account by username
int findAccountByUsername(const vector<BankAccount> &accounts,
                          const string &username)
{
    for (size_t i = 0; i < accounts.size(); i++)
    {
        if (accounts[i].username == username)
        {
            return i;
        }
    }

    return -1;
}

// Function to register a new account
void registerAccount(vector<BankAccount> &accounts)
{
    string username, password;
    double balance;

    cout << "Enter username: ";
    cin >> username;

    if (findAccountByUsername(accounts, username) != -1)
    {
        cout << "Username already exists" << endl;
        return;
    }

    cout << "Enter password: ";
    cin >> password;

    balance = 0;

    BankAccount account = {
        username,
        password,
        balance};
    accounts.push_back(account);
    writeAccounts(accounts, balance, username);

    cout << "Account registered successfully!" << endl;
}

// Function to log in to an existing account
void loginAccount(vector<BankAccount> &accounts, BankAccount &currentAccount)
{
    string username, password;

    cout << "Enter username: ";
    cin >> username;

    int index = findAccountByUsername(accounts, username);

    if (index == -1)
    {
        cout << "Invalid username" << endl;
        return;
    }

    cout << "Enter password: ";
    cin >> password;

    if (accounts[index].password != password)
    {
        cout << "Incorrect password" << endl;
        return;
    }

    currentAccount = accounts[index];

    string line;
    ifstream check;
    check.open(currentAccount.username + ".txt", ios::in);
    while (getline(check, line))
        currentAccount.balance = stoi(line);
    check.close();

    system("cls");
    loggedIn = true;
    cout << "Logged in successfully!" << endl;
}

// Function to deposit money to the current account
void depositBalance(BankAccount &currentAccount)
{
    double amount;

    cout << "Enter amount to deposit: ";
    cin >> amount;

    currentAccount.balance += amount;

    updateBalanceInFile(currentAccount.balance, currentAccount);

    cout << "Balance deposited successfully!"
         << " Current balance: " << currentAccount.balance << endl;
}

// Function to withdraw money from the current account
void withdrawBalance(BankAccount &currentAccount)
{
    double amount;

    cout << "Enter amount to withdraw: ";
    cin >> amount;

    if (amount > currentAccount.balance)
    {
        cout << "Insufficient balance" << endl;
        return;
    }

    currentAccount.balance -= amount;

    updateBalanceInFile(currentAccount.balance, currentAccount);

    cout << "Balance withdrawn successfully!"
         << " Current balance: " << currentAccount.balance << endl;
}

// Function to transfer money from the current account to another account
void transferBalance(vector<BankAccount> &accounts, BankAccount &currentAccount)
{
    string username;

    cout << "Enter recipient username: ";
    cin >> username;

    int index = findAccountByUsername(accounts, username);

    if (index == -1)
    {
        cout << "Recipient account not found!" << endl;
        return;
    }

    if (username == currentAccount.username)
    {
        cout << "You can't transfer balance to your self!" << endl;
        return;
    }

    double amount;

    cout << "Enter amount to transfer: ";
    cin >> amount;

    string line;
    ifstream check;
    check.open(currentAccount.username + ".txt", ios::in);
    while (getline(check, line))
        currentAccount.balance = stoi(line);
    check.close();

    if (amount > currentAccount.balance)
    {
        cout << "Insufficient balance" << endl;
        return;
    }

    currentAccount.balance -= amount; // deduct transferred amount from current account

    ifstream checkOthers;
    checkOthers.open(username + ".txt", ios::in);
    while (getline(checkOthers, line))
        accounts[index].balance = stoi(line);

    checkOthers.close();

    accounts[index].balance += amount; // add transferred amount to recipient account

    cout << "Balance transferred successfully!" << endl;
    cout << "Your updated balance is: " << currentAccount.balance << endl;

    // record the updated currentAccount.balance to the file
    updateBalanceInFile(currentAccount.balance, currentAccount);
    updateBalanceOthers(username, accounts[index].balance);
}

// Function to check the current account balance
void checkBalance(const BankAccount &currentAccount)
{
    string user = currentAccount.username + ".txt";
    string line;

    cout << "Current balance: ";

    ifstream rd;
    rd.open(user, ios::in);
    while (getline(rd, line))
        cout << line << endl;

    rd.close();
}

// Function to log out of the current account
void logoutAccount(BankAccount &currentAccount)
{
    currentAccount = {
        "",
        "",
        0};

    loggedIn = false;
    cout << "Logged out successfully!" << endl;
}

int main()
{
    vector<BankAccount> accounts = readAccounts();
    BankAccount currentAccount = {
        "",
        "",
        0};
    int choice;
    while (true)
    {
        if (!loggedIn)
        {
            cout << "Welcome to the bank system" << endl;
            cout << "1. Register account" << endl;
            cout << "2. Log in to account" << endl;
            cout << "Enter choice: ";
            cin >> choice;

            system("cls");
            switch (choice)
            {
            case 1:
                registerAccount(accounts);
                break;
            case 2:
                loginAccount(accounts, currentAccount);
                break;
            default:
                cout << "Invalid choice" << endl;
            }
        }

        if (loggedIn)
        {
            updateBalanceInFile(currentAccount.balance, currentAccount);
            cout << "1. Deposit balance" << endl;
            cout << "2. Withdraw balance" << endl;
            cout << "3. Transfer balance" << endl;
            cout << "4. Check balance" << endl;
            cout << "5. Log out of account" << endl;
            cout << "6. Quit" << endl;
            cout << "Enter choice: ";
            cin >> choice;

            switch (choice)
            {
            case 1:
                depositBalance(currentAccount);
                break;
            case 2:
                withdrawBalance(currentAccount);
                break;
            case 3:
                transferBalance(accounts, currentAccount);
                break;
            case 4:
                checkBalance(currentAccount);
                break;
            case 5:
                logoutAccount(currentAccount);
                break;
            case 6:
                writeAccounts(accounts, currentAccount.balance, currentAccount.username);
                return 0;
            default:
                cout << "Invalid choice" << endl;
            }
        }
    }

    return 0;
}
