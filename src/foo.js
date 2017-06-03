export default function foo() {
  document.querySelector('#app').innerHTML = 'Hello, World!';

  // eslint-disable-next-line no-console
  console.log('object spread', { ...{ foo: 0 } });
}
