const list = document.querySelector('#list');

const renderAddressList = (addresses, list)=> {
  const html = `
    ${ addresses.map( address => `
        <li data-id='${ address.id }' class='list-group-item'>${ address.name }</li>
      `).join('')}
  `;
  list.innerHTML = html;
  list.addEventListener('click', (ev)=> {
    const target = ev.target;
    if(target.tagName === 'LI'){
      const id = target.getAttribute('data-id');
      axios.delete(`/api/addresses/${id}`)
        .then(()=> {
          target.parentNode.removeChild(target);
        });
    }
  });
};

axios.get('/api/addresses')
  .then( response => response.data)
  .then(addresses => renderAddressList(addresses, list));

const input = document.getElementById('autocomplete');
const autocomplete = new google.maps.places.Autocomplete(input);
autocomplete.addListener('place_changed', ()=> {
  axios.post('/api/addresses', { place: autocomplete.getPlace()})
    .then( response => response.data)
    .then( address => {
       const html = `<li data-id='${ address.id }' class='list-group-item'>${ address.name }</li>`;
       list.innerHTML += html; 
       input.value = '';
    });
});





