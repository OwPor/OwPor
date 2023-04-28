// Concepcion, Ray Vincent DS.

#include <iostream>
#include <fstream>
#include <string>
using namespace std;

bool found = false;
bool loggedIn = false;

struct Bank
{
    int uid;
    int pin;
    double balance;
} currentUser;

void writeBalance(int uid, double balance)
{
    string user = to_string(uid) + ".txt";
    string line;

    ifstream read;
    read.open(user, ios::in);
    while (getline(read, line))
        uid = stoi(line);
    read.close();

    ofstream write;
    write.open(user, ios::out);
    write << uid + balance;
    write.close();
}

void readCurrentBalance()
{
    string user = to_string(currentUser.uid) + ".txt";
    string line;

    ifstream read;
    read.open(user, ios::in);
    while (getline(read, line))
        currentUser.balance = stoi(line);
    read.close();
}

void checkAccount(int uid)
{
    ifstream check;
    string line;
    check.open("accounts.txt", ios::in);

    while (check >> line)
    {
        if (uid == stoi(line))
        {
            found = true;
            break;
        }
    }

    if (!found)
        cout << "No ID found!" << endl;

    check.close();
}

void registerAccount()
{
    Bank regAccount;
    int create;

    system("cls");
    cout << "Register Account" << endl;
    cout << "Enter PIN: ";
    cin >> regAccount.pin;

    while (regAccount.pin < 1000 || regAccount.pin > 9999)
    {
        cout << "PIN must be greater than 1000 and less than 9999!" << endl;
        cout << "Enter PIN: ";
        cin >> regAccount.pin;
    }

    ifstream read;
    string line;
    read.open("accounts.txt", ios::in);
    while (read >> line)
        create = stoi(line);

    read.close();

    if (!(create >= 0))
        create = 0;

    ofstream write;
    write.open("accounts.txt", ios::out | ios::app);
    write << "\n"
          << regAccount.pin << " " << create + 1;
    write.close();

    string user = to_string(create + 1) + ".txt";

    write.open(user, ios::out);
    write << 0;
    write.close();

    cout << "Register account succesful!" << endl;
    cout << "ID: " << create + 1 << endl;
    cout << "PIN: " << regAccount.pin << endl;
    cout << endl;
}

void loginAccount()
{
    int uid;
    int pin;
    system("cls");

    cout << "Login Account" << endl;
    cout << "Enter ID: ";
    cin >> uid;

    checkAccount(uid);

    if (found)
    {
        cout << "Enter PIN: ";
        cin >> pin;

        string checkInfo = to_string(pin) + " " + to_string(uid);

        ifstream info;
        string line;
        info.open("accounts.txt", ios::in);
        while (getline(info, line))
        {
            if (checkInfo == line)
            {
                loggedIn = true;
                found = true;

                currentUser.uid = uid;
                currentUser.pin = pin;
                break;
            }
            else
                found = false;
        }
        info.close();

        readCurrentBalance();

        system("cls");

        if (!found)
            cout << "Wrong PIN!" << endl;
    }
}

void deposit()
{
    string user = to_string(currentUser.uid) + ".txt";
    string line;
    double balance;

    cout << "Enter amount to deposit: ";
    cin >> balance;

    readCurrentBalance();

    currentUser.balance += balance;

    ofstream write;
    write.open(user, ios::out);
    write << currentUser.balance;
    write.close();

    cout << "Deposit successful!" << endl;
    cout << "Current Balance: " << currentUser.balance << endl;
}

void withdraw()
{
    string user = to_string(currentUser.uid) + ".txt";
    string line;
    double balance;

    readCurrentBalance();

    cout << "Enter amount to withdraw: ";
    cin >> balance;

    if (balance > currentUser.balance || balance < 1)
        cout << "Invalid amount!" << endl;
    else if (balance <= currentUser.balance)
    {
        currentUser.balance -= balance;
        cout << "Withdraw successful!" << endl;
    }
    else
        cout << "Invalid input!" << endl;
        
    ofstream write;
    write.open(user, ios::out);
    write << currentUser.balance;
    write.close();

    cout << "Current Balance: " << currentUser.balance << endl;
}

void checkBalance()
{
    string user = to_string(currentUser.uid) + ".txt";
    string line;

    cout << "Current balance: ";

    ifstream read;
    read.open(user, ios::in);
    while (getline(read, line))
        cout << line << endl;
    read.close();
}

void send()
{
    int id;
    double balance;

    cout << "Send Balance" << endl;
    cout << "Enter ID: ";
    cin >> id;

    if (id == currentUser.uid)
        cout << "You can't send money to your self!" << endl;

    checkAccount(id);

    if (found && id != currentUser.uid)
    {
        cout << "Enter amount: ";
        cin >> balance;

        readCurrentBalance();

        if (balance <= currentUser.balance)
        {
            writeBalance(id, balance);
            writeBalance(currentUser.uid, balance * -1);

            readCurrentBalance();

            cout << "Balance sent!" << endl;
            cout << "Current balance: " << currentUser.balance << endl;
        }
        else if (balance <= 0)
        {
            cout << "Invalid amount!" << endl;
        }
        else
            cout << "Invalid input!" << endl;
    }
}

void logout()
{
    currentUser.uid = 0;
    currentUser.pin = 0;
    currentUser.balance = 0;
    loggedIn = false;
    found = false;

    system("cls");

    cout << "Logged out successfully!" << endl;
}

int main()
{
    int choice;
    while (true)
    {
        if (!loggedIn)
        {
            currentUser.uid = 0;
            currentUser.pin = 0;
            currentUser.balance = 0;

            cout << "Welcome to daBank!" << endl;
            cout << "1. Register" << endl;
            cout << "2. Login" << endl;
            cout << "3. Exit" << endl;
            cout << "Enter choice: ";
            cin >> choice;

            switch (choice)
            {
            case 1:
                registerAccount();
                break;
            case 2:
                loginAccount();
                break;
            case 3:
                return 0;
                break;
            default:
                cout << "Invalid input!" << endl;
            }
        }
        else
        {
            found = false;

            cout << "Welcome to daBank!" << endl;
            cout << "1. Deposit" << endl;
            cout << "2. Withdraw" << endl;
            cout << "3. Check Balance" << endl;
            cout << "4. Send Balance" << endl;
            cout << "5. Logout" << endl;
            cout << "6. Exit" << endl;
            cout << "Enter choice: ";
            cin >> choice;

            system("cls");

            switch (choice)
            {
            case 1:
                deposit();
                break;
            case 2:
                withdraw();
                break;
            case 3:
                checkBalance();
                break;
            case 4:
                send();
                break;
            case 5:
                logout();
                break;
            case 6:
                return 0;
                break;
            default:
                cout << "Invalid input!" << endl;
            }
        }
    }
}