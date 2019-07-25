const socket = io.connect('https://vesti.herokuapp.com/');
// const socket = io.connect('/');


const message = document.getElementById('message'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    roomOne = document.querySelector('#room-one'),
    roomTwo = document.querySelector('#room-two'),
    allRooms = document.querySelectorAll('aside div');

allRooms.forEach(Element => {

    Element.addEventListener('click', e => {

        allRooms.forEach(e => {
            e.classList.remove('active');
        });

        e.target.classList.add('active');

        btn.classList.value = '';

        let room = e.target.textContent.split(" ").join("-");

        btn.classList.add(room);
        let roomId = e.target.id;

        socket.emit(roomId)
    })

});



window.addEventListener('load', () => {

    socket.emit('one')

})

btn.addEventListener('click', (e) => {
    e.preventDefault()

    let room = btn.classList.value;

    if (message.value.length <= 0) return

    socket.emit(room, {
        message: message.value,
    })
    message.value = "";
})

//Listening from node
socket.on('chat', data => {

    output.innerHTML += `<strong>Gość: </strong> ${data.message} <br>`;

})
socket.on('all-chat', data => {
    console.log(data);
    output.innerText = ''
    data.forEach(element => {
        output.innerHTML += `<strong>Gość: </strong> ${element.message} <br>`;
    });

})