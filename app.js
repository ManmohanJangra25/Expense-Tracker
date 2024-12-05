'use strict'

const form = document.querySelector('.expense_form_wrap form');
const formInput = document.querySelectorAll('.expense_form_wrap form input');
const submitter = document.querySelector('.expense_form_wrap form button[type=submit]');
const expenseList = document.getElementById('expense-list');

let expenses = [];

if(localStorage.getItem('expenses') != null){
    const getItems = localStorage.getItem('expenses');
    expenses = JSON.parse(getItems);
    createExpenseList(expenses);
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('.expense_form_wrap form input[name=expense_name]').value;
    const amount = document.querySelector('.expense_form_wrap form input[name=expense_amount]').value;
    const date = document.querySelector('.expense_form_wrap form input[name=expense_date]').value;
    
    if(name != '' && amount != '' && date != ''){
        const expense = {
            name,
            amount,
            date
        }
        expenses.push(expense);
        populateStorage(expenses);
        createExpenseList(expenses);

        form.reset();
    } else {
        return;
    }
});

function createExpenseList(expenses){
    expenseList.innerHTML = "";
    
    expenses.forEach(val => {
        const expenseRows = document.createElement('tr');
        expenseRows.innerHTML = `<td>${val.name}</td><td>${val.amount}</td><td>${val.date}</td><td><button class="delete_list">Delete</button></td>`;

        expenseList.append(expenseRows);
    })
}

expenseList.addEventListener('click', function(e){
    const targetDeleteButon = e.target.classList.contains("delete_list");
    const targetedRow = e.target.parentElement.parentElement;
    if(targetDeleteButon){
        targetedRow.remove();
    }
});

function populateStorage(val){
    localStorage.setItem('expenses', JSON.stringify(val));
}
