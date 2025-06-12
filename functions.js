// Length of the internal array of the Java's ArrayList.
const capacity = 5;

// Internal array scaling factor when the current array of the Java's ArrayList is full (elements == capacity)
const scalingFactor = 2;

function setupListeners() {
      const slots = document.querySelectorAll('.slot:not(.empty)');
      slots.forEach(slot => slot.addEventListener('click', () => removeAndShift(slot)));
}

function createSlots(quant){
    const list = document.getElementById("arraylist");
    for (let i = 0; i < quant; i++) {
        const slot = document.createElement("div");
        slot.innerHTML = `<label class='index-label'>array[${i}]</label>${asciiToChar(i+65)}`;
        slot.classList.add("slot")
        list.appendChild(slot);
    }

    elements = quant;
    updateElements()
}

function asciiToChar(asciiCode) {
    return String.fromCharCode(asciiCode);
}

function getSlotValue(slot) {
    const node = Array.from(slot.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
    return node?.textContent.trim() || '';
}

function setSlotValue(slot, value) {
    const indexLabel = slot.querySelector('.index-label');
    slot.textContent = '';
    if (value !== '') {
        slot.textContent = value;
    }
    if (indexLabel) {
        slot.appendChild(indexLabel); // Re-attach label
    }
}

function removeAndShift(clickedSlot) {
    if (clickedSlot.classList.contains('empty')) 
        return;

    const slots = getAllSlots();
    const index = slots.indexOf(clickedSlot);

    clickedSlot.classList.add('empty');
    setSlotValue(clickedSlot, '');

    // Shift values left one-by-one
    for (let i = index + 1; i < slots.length; i++) {
        const current = slots[i];
        const prev = slots[i - 1];

        if (current.classList.contains('empty')) 
            continue;

        const delay = (i - index - 1) * 400;
        setTimeout(() => {
            const value = getSlotValue(current);
            emptySlot(current);

            fillSlot(prev, value);
        }, delay);
    }

    // Rebind listeners after all shifts
    const shiftCount = slots.length - index - 1;
    setTimeout(setupListeners, shiftCount * 400 + 100);
    decrementElements();
}

function getAllSlots() {
    return Array.from(document.querySelectorAll('.slot'));
}

function getSlot(i) {
    return getAllSlots()[i];
}


function emptySlot(slot) {
    slot.classList.add('empty');
    setSlotValue(slot, '');
}

function fillSlot(slot, value) {
    slot.classList.remove('empty');
    setSlotValue(slot, value);
}

// Number of elements currently filled 
let elements = 0

function addElement(){
    if(elements === capacity){
        window.alert("The list is full.")
        return;
    }

    const value = getLastSlotValue();
    const letter = asciiToChar(value.charCodeAt(0)+1);
    incrementElements();

    fillSlot(getLastSlot(), letter);
}

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
    return getSlotValue(slot);
}

function updateElements() {
    const div = document.getElementById("size");
    div.innerHTML = `<label>Elements: ${elements} Capacity: ${capacity}</label>`;
}

createSlots(capacity);
setupListeners();


