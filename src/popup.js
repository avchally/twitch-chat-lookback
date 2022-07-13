document.querySelector('#search-message').addEventListener('click', (event) => {
    const channel = document.querySelector('#channel-input').value;
    const user = document.querySelector('#user-input').value;
    getUserMessages(channel, user);
})

const getUserMessages = (channel, user) => {
    const url = `http://127.0.0.1:3001/messages?channel=${channel}&user=${user}`;
    console.log(url);
    fetch(url, {
        method: "GET"
    })
        .then(response => response.json())
        .then(data => applyMessages(data))
        .catch(err => console.log(err));
}

const applyMessages = (data) => {
    const messageList = document.querySelector('#message-display');
    messageList.innerHTML = '';
    // for (let i = 0; i < messageList.children.length; i++) {
    //     messageList.removeChild(messageList.children[i]);
    // }
    
    data.forEach(message => {
        const datestamp = (new Date(Number(message.timestamp))).toLocaleString();
        const li = document.createElement('li');
        const newText = document.createTextNode(`${message.displayname}: ${message.message} (${datestamp})`);
        li.appendChild(newText);
        messageList.appendChild(li);
    });
}