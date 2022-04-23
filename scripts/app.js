//dom queries
const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMessage = document.querySelector(".update-mssg");
const chatRooms = document.querySelector(".chat-rooms");

//new chat
newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  chatroom
    .addChats(newChatForm.message.value.trim())
    .then(() => newChatForm.reset())
    .catch((err) => console.log(err));
});

//new Name
newNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = newNameForm.name.value.trim();
  chatroom.updateName(name);
  localStorage.setItem("name", name);
  newNameForm.reset();
  newNameForm.children[0].children[1].setAttribute("placeholder", `Current Username : ${name}`);
  updateMessage.innerText = ` Your name is updated successfully as ${name}`;
  setTimeout(() => (updateMessage.innerText = ""), 3000);
});

//update chatroom

chatRooms.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute("id"));
    chatroom.getChats((data) => chatUI.render(data));
    localStorage.setItem("room", e.target.getAttribute("id"));
    newChatForm.children[0].children[1].setAttribute("placeholder", `Current Room : ${e.target.getAttribute("id")}`);
  }
});

//class instances
let defaultName = localStorage.name ? localStorage.name : "Anonymous";
let defaultRoom = localStorage.room ? localStorage.name : "general";
newNameForm.children[0].children[1].setAttribute("placeholder", `Current Username : ${defaultName}`);
newChatForm.children[0].children[1].setAttribute("placeholder", `Current Room : ${defaultRoom}`);

const chatroom = new Chatroom(defaultName, defaultRoom);
const chatUI = new ChatUI(chatList);

//get chats and render
chatroom.getChats((data) => chatUI.render(data));
