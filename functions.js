const capacity = 5;

function setupListeners() {
      const slots = document.querySelectorAll('.slot:not(.empty)');
      slots.forEach(slot => slot.addEventListener('click', () => removeAndShift(slot)));
}

function createSlots(quant){
    const list = document.getElementById("arraylist");
    for (let i = 0; i < quant; i++) {
        const slot = document.createElement("div");
        slot.innerHTML = `<label class='index-label'>array[${i}]</label>${String.fromCharCode(i+65)}`;
        slot.classList.add("slot")
        list.appendChild(slot);
    }

    elements = quant;
    updateElements()
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

    const allSlots = Array.from(document.querySelectorAll('.slot'));
    const index = allSlots.indexOf(clickedSlot);

    clickedSlot.classList.add('empty');
    setSlotValue(clickedSlot, '');

    // Shift values left one-by-one
    for (let i = index + 1; i < allSlots.length; i++) {
        const current = allSlots[i];
        const prev = allSlots[i - 1];

        if (current.classList.contains('empty')) 
            continue;

        const delay = (i - index - 1) * 400;
        setTimeout(() => {
            const value = getSlotValue(current);
            current.classList.add('empty');
            setSlotValue(current, '');

            prev.classList.remove('empty');
            setSlotValue(prev, value);
        }, delay);
    }

    // Rebind listeners after all shifts
    const shiftCount = allSlots.length - index - 1;
    setTimeout(setupListeners, shiftCount * 400 + 100);
    decrementElements();
}

let elements = 0
const decrementElements = () => {
    --elements;
    updateElements();
    return elements;
}

function updateElements() {
    const div = document.getElementById("size");
    div.innerHTML = `<label>Elements: </label>${elements}`;
}

createSlots(capacity);
setupListeners();


