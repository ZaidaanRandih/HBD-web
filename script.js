
document.addEventListener('DOMContentLoaded', function() {
    const countdownContainer = document.getElementById('countdownContainer');
    const birthdayCard = document.getElementById('birthdayCard');
    const celebrateBtn = document.getElementById('celebrateBtn');
    const card = document.querySelector('.card');
    
    // Set birthday to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    // Update countdown timer
    function updateCountdown() {
        const now = new Date();
        const diff = tomorrow - now;
        
        if (diff <= 0) {
            // Birthday has arrived!
            countdownContainer.style.opacity = '0';
            setTimeout(() => {
                countdownContainer.style.display = 'none';
                birthdayCard.style.display = 'block';
            }, 1000);
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Initial call and set interval
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // For demo purposes, add a way to skip the countdown
    countdownContainer.addEventListener('click', function() {
        countdownContainer.style.opacity = '0';
        setTimeout(() => {
            countdownContainer.style.display = 'none';
            birthdayCard.style.display = 'block';
        }, 1000);
    });
    
    // Create confetti colors
    const confettiColors = [
        '#ff6b9d', '#6a9eff', '#ffde59', '#7ed957', '#cb6ce6', 
        '#ff4b8a', '#4a7aff', '#ffce29', '#5eb937', '#ab4cc6'
    ];
    
    // Function to create confetti
    function createConfetti() {
        for (let i = 0; i < 150; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                
                // Randomize confetti appearance
                const size = Math.random() * 12 + 5;
                const colorIndex = Math.floor(Math.random() * confettiColors.length);
                
                confetti.style.width = `${size}px`;
                confetti.style.height = `${size}px`;
                confetti.style.backgroundColor = confettiColors[colorIndex];
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                
                // Position confetti
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.top = '-10px';
                
                // Animation
                confetti.style.animation = `confettiFall ${Math.random() * 4 + 2}s ease-out forwards`;
                
                card.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => {
                    confetti.remove();
                }, 6000);
            }, i * 20);
        }
    }
    
    // Function to create balloons
    function createBalloons() {
        const balloonColors = ['#ff6b9d', '#6a9eff', '#ffde59', '#7ed957', '#cb6ce6'];
        
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const balloon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                balloon.classList.add('balloon');
                balloon.setAttribute('width', '40');
                balloon.setAttribute('height', '50');
                balloon.setAttribute('viewBox', '0 0 40 50');
                
                const balloonPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
                balloonPath.setAttribute('d', 'M20,1 C30,1 38,10 38,20 C38,30 30,40 20,45 C10,40 2,30 2,20 C2,10 10,1 20,1 Z');
                balloonPath.setAttribute('fill', balloonColors[i % balloonColors.length]);
                
                const string = document.createElementNS("http://www.w3.org/2000/svg", "path");
                string.setAttribute('d', 'M20,45 Q22,48 20,50 Q18,48 20,45');
                string.setAttribute('stroke', '#888');
                string.setAttribute('fill', 'none');
                
                balloon.appendChild(balloonPath);
                balloon.appendChild(string);
                
                // Position balloon
                balloon.style.left = `${5 + (i * 9)}%`;
                balloon.style.animation = `float ${Math.random() * 3 + 6}s ease-out forwards`;
                
                card.appendChild(balloon);
                
                // Remove balloon after animation
                setTimeout(() => {
                    balloon.remove();
                }, 9000);
            }, i * 200);
        }
    }
    
    // Function to create sparkles
    function createSparkles() {
        for (let i = 0; i < 40; i++) {
            setTimeout(() => {
                const sparkle = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                sparkle.classList.add('sparkle');
                sparkle.setAttribute('width', '20');
                sparkle.setAttribute('height', '20');
                sparkle.setAttribute('viewBox', '0 0 20 20');
                
                const sparklePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
                sparklePath.setAttribute('d', 'M10,0 L12,8 L20,10 L12,12 L10,20 L8,12 L0,10 L8,8 Z');
                sparklePath.setAttribute('fill', '#fff');
                
                sparkle.appendChild(sparklePath);
                
                // Position sparkle
                sparkle.style.left = `${Math.random() * 100}%`;
                sparkle.style.top = `${Math.random() * 100}%`;
                sparkle.style.animation = `sparkle ${Math.random() * 1 + 0.5}s ease-out forwards`;
                
                card.appendChild(sparkle);
                
                // Remove sparkle after animation
                setTimeout(() => {
                    sparkle.remove();
                }, 1500);
            }, i * 80 + Math.random() * 500);
        }
    }
    
    // Add click event to button
    celebrateBtn.addEventListener('click', function() {
        createConfetti();
        createBalloons();
        createSparkles();
        
        // Add a little shake to the card
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = 'shake 0.5s ease';
        }, 10);
        
        // Change button text temporarily
        const originalText = this.textContent;
        this.textContent = 'Hooray!';
        this.disabled = true;
        this.style.backgroundColor = '#7ed957';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
            this.style.backgroundColor = '#ff6b9d';
        }, 2000);
    });
    
    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: perspective(1000px) rotateY(5deg) translateY(-5px); }
            25% { transform: perspective(1000px) rotateY(5deg) translateY(-5px) translateX(-5px); }
            50% { transform: perspective(1000px) rotateY(5deg) translateY(-5px) translateX(5px); }
            75% { transform: perspective(1000px) rotateY(5deg) translateY(-5px) translateX(-5px); }
        }
    `;
    document.head.appendChild(style);
});