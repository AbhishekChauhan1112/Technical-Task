// public/app.js

document.addEventListener('DOMContentLoaded', () => {
    // Fetch cars when the page loads
    fetch('/api/cars')
        .then(response => response.json())
        .then(cars => {
            // Process the cars and display them on the home page
            displayCars(cars);
        })
        .catch(error => console.error('Error fetching cars:', error));

    // Handle user registration
    document.getElementById('registerForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error during registration. Please try again.');
        });
    });

    // Handle user login
    document.getElementById('loginForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            // You can redirect or perform other actions after successful login
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error during login. Please try again.');
        });
    });

    // Handle user logout
    document.getElementById('logoutButton').addEventListener('click', () => {
        fetch('/api/logout')
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                // You can redirect or perform other actions after successful logout
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error during logout. Please try again.');
            });
    });
});

function displayCars(cars) {
    const carGrid = document.querySelector('.car-grid');

    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.classList.add('car-card');

        const image = document.createElement('img');
        image.src = 'path/to/car/image'; // Replace with the actual path to the car image
        image.alt = `${car.make} ${car.model}`;
        carCard.appendChild(image);

        const details = document.createElement('div');
        details.classList.add('car-details');

        const makeModel = document.createElement('h3');
        makeModel.textContent = `${car.make} ${car.model}`;
        details.appendChild(makeModel);

        const year = document.createElement('p');
        year.textContent = `Year: ${car.year}`;
        details.appendChild(year);

        const price = document.createElement('p');
        price.textContent = `Price: $${car.price}`;
        details.appendChild(price);

        const viewDetailsButton = document.createElement('button');
        viewDetailsButton.textContent = 'View Details';
        viewDetailsButton.addEventListener('click', () => {
            // Implement logic to navigate to the car details page
            // You can use window.location.href or a router library
            window.location.href = `/car-details.html?carId=${car._id}`;
            alert(`View details of ${car.make} ${car.model}`);
        });
        details.appendChild(viewDetailsButton);

        carCard.appendChild(details);
        carGrid.appendChild(carCard);
    });
}


