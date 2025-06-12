function createSlot(){
    const list = document.getElementById("list");
    const slot = document.createElement("div");
    slot.classList.add("slot")
    //slot.style = `grid-column: ${elements};`;
    slot.addEventListener('click', () => remove(slot));
    // simulates a random memory address
    const memAddress = Math.round( Math.random()*10000).toString(16);
    slot.innerHTML = `<label class='index-label'>0x${memAddress}</label>`;

    const value = getLastSlotValue();
    const letter = asciiToChar(value.charCodeAt(0)+1);

    setSlotValue(slot, letter);
    list.appendChild(slot);
    incrementElements();
}

function asciiToChar(asciiCode) {
    return String.fromCharCode(asciiCode);
}

function getSlotValue(slot) {
    const node = Array.from(slot.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
    return node?.textContent.trim() || '';
}

function remove(clickedSlot) {
    if (clickedSlot.classList.contains('empty'))
        return;

    const slots = getAllSlots();
    const i = slots.indexOf(clickedSlot);

    setSlotValue(clickedSlot, '');

    const current = slots[i];

    const delay = 400;
    const list = document.getElementById("list")
    console.log(current);
    setTimeout(() => list.removeChild(current), delay);
    decrementElements();
}

function getAllSlots() {
    return Array.from(document.querySelectorAll('.slot'));
}

function getSlot(i) {
    return getAllSlots()[i];
}

function setSlotValue(slot, value) {
    const indexLabel = slot.querySelector('.index-label');
    slot.textContent = '';
    if (value === '') {
        slot.classList.add('empty');
    } else {
        slot.textContent = value;
        slot.classList.remove('empty');
    }
    if (indexLabel) {
        slot.appendChild(indexLabel); // Re-attach label
    }
}

// Number of elements currently filled
let elements = 0

const getLastSlot = () => getSlot(elements-1);

const decrementElements = () => {
    --elements;
    updateElements();
    return elements;
}

const incrementElements = () => {
    ++elements;
    updateElements();
    return elements;
}

function getLastSlotValue() {
    const slot = getLastSlot();
    // @ is the char before 'A'
    return slot ? getSlotValue(slot) : '@';
}

function updateElements() {
    const div = document.getElementById("size");
    div.innerHTML = `<label>Elements: ${elements}</label>`;
}
