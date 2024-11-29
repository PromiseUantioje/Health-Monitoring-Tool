
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function showPosition(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
        // Displaying the coordinates (this can be extended to use maps or clinic APIs)
        document.getElementById("results").innerHTML = `
            Your location: Latitude: ${lat}, Longitude: ${lon}.<br>
            Find nearby clinics or health centers using this information.
        `;
        
        // You can also integrate this with Google Maps or a similar service to display locations on a map.
    }
    
    // Call the function to get the location
    getLocation();

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('symptom-checker-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/style.css',
                '/app.js'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});

const symptomsInput = document.getElementById("symptoms").value; // Getting user input
const apiUrl = 'https://api.ada.com/v1/diagnosis'; // Sample URL for Ada API (Replace with actual API endpoint)

fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'  // Use your API key here
  },
  body: JSON.stringify({
    symptoms: symptomsInput
  })
})
.then(response => response.json())
.then(data => {
  // Display the results from the AI analysis
  document.getElementById("results").innerText = "AI Diagnosis: " + data.diagnosis;
})
.catch(error => {
  document.getElementById("results").innerText = "Error: " + error.message;
});

letdb;

const request = indexedDB.open("healthData", 1);

request.onsuccess = function(event) {
    db = event.target.result;
};

request.onerror = function(event) {
    console.error("Error opening database.");
};

// Storing symptom data when the user submits
function storeSymptomData(symptoms, advice) {
    const transaction = db.transaction(["symptoms"], "readwrite");
    const store = transaction.objectStore("symptoms");

    const data = { symptoms, advice, timestamp: new Date() };
    store.add(data);
}

// Retrieving stored symptom data
function getStoredSymptoms() {
    const transaction = db.transaction(["symptoms"]);
    const store = transaction.objectStore("symptoms");
    const request = store.getAll();

    request.onsuccess = function(event) {
        const symptoms = event.target.result;
        console.log("Stored Symptoms: ", symptoms);
    };
}

// Create the object store when the database is upgraded
request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore("symptoms", { keyPath: "timestamp" });
};

let db;

// Open (or create) the database
const request = indexedDB.open("healthData", 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    // Create an object store with 'timestamp' as the key
    db.createObjectStore("symptoms", { keyPath: "timestamp" });
};

request.onsuccess = function(event) {
    db = event.target.result;
};

request.onerror = function(event) {
    console.error("Error opening IndexedDB.");
};

function storeSymptomData(symptoms, advice) {
    const transaction = db.transaction(["symptoms"], "readwrite");
    const store = transaction.objectStore("symptoms");

    const data = { symptoms, advice, timestamp: new Date() };
    store.add(data);
}

document.getElementById("symptom-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const symptoms = document.getElementById("symptoms").value;
    const advice = "Consult a healthcare provider for your symptoms.";

    // Store data in IndexedDB
    storeSymptomData(symptoms, advice);

    document.getElementById("results").innerText = "Your symptoms have been recorded.";
});

function getStoredSymptoms() {
    const transaction = db.transaction(["symptoms"]);
    const store = transaction.objectStore("symptoms");
    const request = store.getAll();

    request.onsuccess = function(event) {
        const symptoms = event.target.result;
        console.log("Stored Symptoms: ", symptoms);
    };
}

document.getElementById("symptom-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const symptoms = document.getElementById("symptoms").value;
    // Placeholder for analysis logic
    document.getElementById("results").innerText = "Analysis: Please visit the nearest clinic.";
});

