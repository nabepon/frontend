export default function foo() {
  document.querySelector('#app').innerHTML = 'Hello, World!';

  console.log('object spread', { ...{ foo: 0 } });
}
