// Length of the internal array of the Java's ArrayList.
let capacity = 5;

// Internal array scaling factor when the current array of the Java's ArrayList is full (elements == capacity)
const scalingFactor = 2;

function setupListeners() {
      const slots = document.querySelectorAll('.slot:not(.empty)');
      slots.forEach(slot => slot.addEventListener('click', () => removeAndShift(slot)));
}

function createSlots(quant, filled = false, startIndex = 0){
    const list = document.getElementById("list");
    for (let i = startIndex; i < quant+startIndex; i++) {
        const slot = document.createElement("div");
        slot.innerHTML = `<label class='index-label'>array[${i}]</label>`;
        const value = filled ? asciiToChar(i+65) : '';
        setSlotValue(slot, value);
        slot.classList.add("slot")
        list.appendChild(slot);
    }

    if(filled)
        elements += quant;
    updateElements();
}

function asciiToChar(asciiCode) {
    return String.fromCharCode(asciiCode);
}

function getSlotValue(slot) {
    const node = Array.from(slot.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
    return node?.textContent.trim() || '';
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
            setSlotValue(current, '');

            setSlotValue(prev, value);
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

function addElement(){
    if(elements === capacity){
        const newCapacity = capacity*scalingFactor;
        createSlots(newCapacity - capacity, false, elements);
        capacity = newCapacity;
    }

    const value = getLastSlotValue();
    const letter = asciiToChar(value.charCodeAt(0)+1);
    incrementElements();

    setSlotValue(getLastSlot(), letter);
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
    // @ is the char before 'A'
    return slot ? getSlotValue(slot) : '@';
}

function updateElements() {
    const div = document.getElementById("size");
    div.innerHTML = `<label>Elements: ${elements} Capacity: ${capacity}</label>`;
}

createSlots(capacity, true);
setupListeners();


