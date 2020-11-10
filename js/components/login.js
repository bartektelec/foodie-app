import Component from '../core/Component.js';
import Reactive from '../core/Reactive.js';
import { navigateTo } from '../app.js';
import { API_URL } from '../vars.js';
import { addAlert } from './alert.js';
import { toggleModal } from './modal.js';
import { jwt } from '../models/index.js';

const loginUser = async () => {
  // alert(`${username.value} ${password.value}`);
  try {
    const req = await fetch(API_URL + '/auth/local/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: username.value,
        password: password.value,
      }),
    });
    const data = await req.json();
    isLoggedIn.value = true;
    // jwt.set(data.jwt);
    toggleModal();
    navigateTo('login');
  } catch (e) {
    isLoggedIn.value = false;
    addAlert(`💩 ${e.message}`, 'danger');
  }
};

const username = Reactive('');
const password = Reactive('');

export const isLoggedIn = Reactive(jwt.isSet());

const login = new Component('div', { class: 'card modal-card' }, [
  new Component('div', { class: 'card-header' }, 'Log in'),
  new Component('div', { class: 'card-body' }, [
    new Component('div', { class: 'form-group' }, [
      new Component('label', {}, 'Username'),
      new Component('input', { class: 'form-control' })
        .attr('type', 'text')
        .model(username),
    ]),
    new Component('div', { class: 'form-group' }, [
      new Component('label', {}, 'Password'),
      new Component('input', { class: 'form-control' })
        .attr('type', 'password')
        .model(password),
    ]),
    new Component(
      'a',
      { attr: ['href', '#'], on: ['click', () => toggleModal('register')] },
      'Create a new account'
    ),
  ]),
  new Component('div', { class: 'card-footer' }, [
    new Component(
      'button',
      { class: 'btn btn-outline-danger' },
      'Close'
    ).on('click', () => toggleModal()),
    new Component('button', { class: 'btn btn-primary' }, 'Log in').on(
      'click',
      () => loginUser()
    ),
  ]),
]);

export default login;
