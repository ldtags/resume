let sortAlgo = '';
let ARR_SIZE = window.innerWidth / 30;
let ANIMATION_SPEED = 30;

//timeout is necessary because js will attempt to load the bars before the HTML is actually loaded
//so method calls (maybe only ones that affect the html?) require the timeout
window.onload = setTimeout(() => {
                    generateBars();
                }, 50);


function quicksort() {
    let bars = document.querySelectorAll(".bar");
    quicksortStart(bars).then(enable);
}

function quicksortStart(bars) {
    return new Promise(function(resolve) {
        quicksortRec(bars, 0, bars.length-1);
        resolve();
    }, 2000);
}

async function quicksortRec(bars, min, max) {
    if(min >= max) {  return;  }

    let pivot = parseInt(bars[max].childNodes[0].innerHTML);
    bars[max].style.backgroundColor = "red";
    let i = min - 1;
    for(let j = min; j <= max; j++) {
        if(parseInt(bars[j].childNodes[0].innerHTML) < pivot) {
            i++;
            await new Promise((resolve) =>
                    setTimeout(() => {
                        resolve();
                }, ANIMATION_SPEED)
            );
            swap(bars, i, j);
        }
    }
    
    await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
        }, ANIMATION_SPEED)
    );
    swap(bars, i+1, max);
    let pI = i+1;
    quicksortRec(bars, min, pI-1);
    bars[pI].style.backgroundColor = " rgb(49, 226, 13)";
    quicksortRec(bars, pI+1, max);
}


async function countingSort() {
    generateCounter();

    let bars = document.querySelectorAll(".bar");
    let counter = new Array(parseInt(window.innerHeight / 12) + 2).fill(0);
    for(let i = 0; i < bars.length; i++) {
        counter[parseInt(bars[i].childNodes[0].innerHTML)]++;
        bars[i].style.height = '0px';
        await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
            }, ANIMATION_SPEED)
        );
        bars[i].childNodes[0].innerHTML = '';
        renderCount(counter);
    }

    let j = 0, i = 0;
    while(i < counter.length) {
        if(counter[i] > 0) {
            bars[j].childNodes[0].innerHTML = i;
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, ANIMATION_SPEED)
            );
            bars[j].style.height = i * 9 + 'px';
            bars[j].style.backgroundColor = " rgb(49, 226, 13)";

            j++;
            counter[i]--;
            renderCount(counter);
        } else {
            i++;
        }
    }

    document.getElementById("counter").style.display = 'none';
    enable();
}

function renderCount(counter) {
    clearRender();
    const sections = document.querySelectorAll(".counter-section");
    let j = 0;
    for(let i = 0; i < counter.length; i++) {
        if(counter[i] != 0 && counter[i]) {
            const label = document.createElement("label");
            label.classList.add("counter-label");
            label.innerHTML = i + ": " + counter[i];
            sections[j].appendChild(label);
            j++;
        }
    }

}

function clearRender() {
    const labels = document.querySelectorAll(".counter-label");
    for(let i = 0; i < labels.length; i++) {
        labels[i].parentNode.removeChild(labels[i]);
    }
}

async function insertionSort() {
    let bars = document.querySelectorAll(".bar");
    let key, j;
    for(let i = 0; i < bars.length; i++) {
        key = parseInt(bars[i].childNodes[0].innerHTML);
        bars[i].style.backgroundColor = "darkBlue";
        j = i - 1;
        while(j >= 0 && parseInt(bars[j].childNodes[0].innerHTML) > key) {
            // To pause the execution of code
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, ANIMATION_SPEED)
            );

            swap(bars, j, j+1);

            j = j - 1;
        }
        bars[j+1].childNodes[0].innerHTML = key;
        bars[j+1].style.backgroundColor = " rgb(49, 226, 13)";
    }
    enable();
}


async function selectionSort() {
    let bars = document.querySelectorAll(".bar");

    var min = 0;
    for(let i = 0; i < bars.length; i++) {
        min = i;
        bars[i].style.backgroundColor = "darkBlue";

        for(let j = i+1; j < bars.length; j++) {
            bars[j].style.backgroundColor = "red";
            // To pause the execution of code
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, ANIMATION_SPEED / 6)
            );

            let minVal = parseInt(bars[min].childNodes[0].innerHTML);
            let temp = parseInt(bars[j].childNodes[0].innerHTML);

            if(temp < minVal) {
                if(min !== i) {
                    bars[min].style.backgroundColor = "  rgb(24, 190, 255)";
                }
                min = j;
            }  else {
                bars[j].style.backgroundColor = "  rgb(24, 190, 255)";
            }
        }

        //swaps the values (if no lower values are found, nothing needs to be swapped)
        if(min != i) {swap(bars, min, i);}
        // To pause the execution of code
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, ANIMATION_SPEED * 2)
        );

        // Provide skyblue color to the (min-idx)th bar
        bars[min].style.backgroundColor = "  rgb(24, 190, 255)";
    
        // Provide lightgreen color to the ith bar
        bars[i].style.backgroundColor = " rgb(49, 226, 13)";
    }
    enable();
}

async function mergeSort() {
    let bars = document.querySelectorAll(".bar");
    let min = 0, max = bars.length-1;
    mergeSortRecursion(bars, min, max);
    enable();
}

async function mergeSortRecursion(bars, min, max) {
    if(min >= max)
        return;

    let mid = parseInt(min +(max-min)/2);
    mergeSortRecursion(bars, min, mid);
    mergeSortRecursion(bars, mid + 1, max);
    merge(bars, min, mid, max);
}

function merge(bars, min, mid, max) {
    let left = [], right = [];
    for(let i = 0; i < mid - min + 1; i++) {
        left[i] = bars[min + i];
    }
    for(let i = 0; i < max - mid; i++) {
        right[i] = bars[i + mid + 1];
    }

    let l = 0, r = 0, i = min;
    while(l < left.length && r < right.length) {
        if(parseInt(left[l].childNodes[0].innerHTML) < parseInt(right[r].childNodes[0].innerHTML)) {
            bars[i].childNodes[0].innerHTML = left[l].childNodes[0].innerHTML;
            l++;
        } else {
            bars[i].childNodes[0].innerHTML = right[r].childNodes[0].innerHTML;
            r++;
        }
        i++;
    }

    while(l < left.length) {
        bars[i].childNodes[0].innerHTML = left[l].childNodes[0].innerHTML;
        i++;
        l++;
    }
    while(r < right.length) {
        bars[i].childNodes[0].innerHTML = right[r].childNodes[0].innerHTML;
        i++;
        r++;
    }
}

function swap(arr, ind1, ind2) {
    //Creates the temp values for swapping
    let tempHeight = arr[ind1].style.height;
    let tempColor = arr[ind1].style.backgroundColor;
    let tempVal = arr[ind1].childNodes[0].innerText;

    //loads ind1 with data from ind2
    arr[ind1].style.height = arr[ind2].style.height;
    arr[ind1].style.backgroundColor = arr[ind2].style.backgroundColor;
    arr[ind1].childNodes[0].innerText = arr[ind2].childNodes[0].innerText;

    //loads ind2 with the data originally from ind1
    arr[ind2].style.height = tempHeight;
    arr[ind2].style.backgroundColor = tempColor;
    arr[ind2].childNodes[0].innerText = tempVal;
}

function generateBars(num = ARR_SIZE) {
    clearBars();
    for(let i = 0; i < num; i++) {
        const value = Math.floor(Math.random() * (window.innerHeight / 12)) + 1;
        const container = document.getElementById("sorting-container");

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = (value * 9) + 'px';
        bar.style.transform = 'translateX(' + (i * 30) + 'px)';
        const barLabel = document.createElement("label");
        barLabel.classList.add("bar_id");
        barLabel.innerHTML = value;
        bar.appendChild(barLabel);
        container.appendChild(bar);
    }
}

function generateCounter(num = ARR_SIZE) {
    clearCounter();
    const counter = document.getElementById("counter");
    counter.style.display = 'inline-block';
    for(let i = 0; i < num; i++) {
        const section = document.createElement("div");
        section.classList.add("counter-section");
        counter.appendChild(section);
    }
}

function clearCounter() {
    let sections = document.querySelectorAll(".counter-section");
    for(let i = 0; i < sections.length; i++) {
        sections[i].parentNode.removeChild(sections[i]);
    }
}

function removeCounter() {
    clearCounter();
    const counter = document.getElementById("counter");
    counter.style.display = 'none';
}

function clearBars() {
    let bars = document.querySelectorAll(".bar");
    for(let i = 0; i < bars.length; i++) {
        bars[i].parentNode.removeChild(bars[i]);
    }
}


function sortArray() {
    const bars = document.querySelectorAll(".bar");
    if(!bars[5]) {
        alert("Please generate an array");
        enable();
    } else {
        switch(sortAlgo) {
            case "merge":
                mergeSort();
                break;
            case "insertion":
                insertionSort();
                break;
            case "quick":
                quicksort();
                checkArray();
                break;
            case "selection":
                selectionSort();
                break;
            case "counting":
                countingSort();
                break;
            default:
                alert("Please select a sorting algorithm");
                enable();
                break;
        }
    }
}

function disable() {
    // To disable the button "Generate New Array"
    document.getElementById("new-array-btn").disabled = true;
    document.getElementById("new-array-btn").style.cursor = 'auto';
    document.getElementById("new-array-btn").style.backgroundColor = "#5a7dc5";

    // To disable the button "Selection Sort"
    document.getElementById("sort-btn").disabled = true;
    document.getElementById("sort-btn").style.cursor = 'auto';
    document.getElementById("sort-btn").style.backgroundColor = "#5a7dc5";
}

function enable() {
    // To enable the button "Generate New Array" after final(sorted)
    document.getElementById("new-array-btn").disabled = false;
    document.getElementById("new-array-btn").style.cursor = 'pointer';
    document.getElementById("new-array-btn").style.backgroundColor = "#315397";

    // To enable the button "Selection Sort" after final(sorted)
    document.getElementById("sort-btn").disabled = false;
    document.getElementById("sort-btn").style.cursor = 'pointer';
    document.getElementById("sort-btn").style.backgroundColor = "#315397";
}

function setMerge() {
    sortAlgo = "merge";
}

function setInsertion() {
    sortAlgo = "insertion";
}

function setQuick() {
    sortAlgo = "quick";
}

function setSelection() {
    sortAlgo = "selection";
}

function setCounting() {
    sortAlgo = "counting";
}

function setSize(size) {
    ARR_SIZE = size;
}

function setSpeed(milliseconds) {
    ANIMATION_SPEED = milliseconds;
}

function printBarVals() { 
    let arr = document.querySelectorAll(".bar");
    let toPrint = "";
    let i; 
    for (i = 0; i < arr.length; i++) 
        toPrint += arr[i].childNodes[0].innerHTML + " ";
    alert(toPrint);
} 

function printArray(arr) {
    let toPrint = "";
    for(let i = 0; i < arr.length; i++) {
        toPrint += arr[i] + " ";
    }
    console.log(toPrint);
}

function copyToArray(origin, copy) {
    if(copy.length < origin.length)
        return;
    for(let i = 0; i < origin.length; i++) {
        copy[i] = origin[i];
    }
}

function compareArrays(unsorted, sorted) {
    //O(n) time complexity non-unique array matching
    //checks if each array has equal occurances of each value
    if(unsorted.length != sorted.length) return false;
    let counter = new Array(unsorted.length).fill(0);
    for(let i = 0; i < unsorted.length; i++) {
        counter[unsorted[i]]++;
    }
    for(let i = 0; i < sorted.length; i++) {
        counter[sorted[i]]--;
    }
    for(let i = 0; i < counter.length; i++) {
        if(counter[i] != 0) return false;
    }
    return true;
}

async function checkArray() {
    let bars = document.querySelectorAll(".bar");
    return new Promise(function(resolve) {
        setTimeout(function() {
            for(let i = 0; i < bars.length; i++) {
                bars[i].style.backgroundColor = " rgb(49, 226, 13)";
            }
            resolve();
        }, 4000);
    })
}

function generateTestArray(length) {
    return Array.from({length: length}, () => Math.floor(Math.random() * length));
}

function tempSwap(arr, ind1, ind2) {
    let temp = arr[ind1];
    arr[ind1] = arr[ind2];
    arr[ind2] = temp;
}