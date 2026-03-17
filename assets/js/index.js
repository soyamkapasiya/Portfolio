'use strict';

document.addEventListener('DOMContentLoaded', () => {
    
    /**
     * Custom Cursor Logic
     */
    const cursor = document.querySelector('.custom-cursor');
    const updateCursor = (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    }
    window.addEventListener('mousemove', updateCursor);

    const interactables = document.querySelectorAll('a, button, .bento-card, .project-img, .packet');
    const addCursorHover = (el) => {
        el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(4)');
        el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
    };
    interactables.forEach(addCursorHover);

    /**
     * Reveal Observer
     */
    const observerOptions = { threshold: 0.15 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, observerOptions);
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /**
     * Header Scroll
     */
    const header = document.querySelector('[data-header]');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) header.classList.add('active');
            else header.classList.remove('active');
        });
    }

    /**
     * Rogue AI Defense Game
     */
    const gameCanvas = document.getElementById('game-canvas');
    if (gameCanvas) {
        const scoreDisplay = document.getElementById('game-score');
        const startBtn = document.getElementById('start-defense');
        const statusDisplay = document.getElementById('game-status');
        
        let integrity = 100;
        let gameActive = false;
        let spawnInterval;

        const spawnPacket = () => {
            if (!gameActive) return;
            
            const packet = document.createElement('div');
            packet.className = 'packet';
            packet.style.position = 'absolute';
            packet.style.width = '30px';
            packet.style.height = '30px';
            packet.style.background = 'transparent';
            packet.style.border = '2px solid var(--hyper-cyan)';
            packet.style.boxShadow = '0 0 10px var(--hyper-cyan)';
            packet.style.display = 'grid';
            packet.style.placeItems = 'center';
            packet.style.fontSize = '12px';
            packet.style.color = 'var(--hyper-cyan)';
            packet.innerText = 'ERR';
            
            const startX = Math.random() * (gameCanvas.offsetWidth - 30);
            packet.style.left = `${startX}px`;
            packet.style.top = '-40px';
            
            gameCanvas.appendChild(packet);
            
            let pos = -40;
            const FallSpeed = 2 + Math.random() * 3;
            
            const fall = setInterval(() => {
                if (!gameActive) {
                    clearInterval(fall);
                    packet.remove();
                    return;
                }
                
                pos += FallSpeed;
                packet.style.top = `${pos}px`;
                
                if (pos > gameCanvas.offsetHeight) {
                    clearInterval(fall);
                    packet.remove();
                    integrity -= 10;
                    updateStats();
                }
            }, 16);
            
            packet.addEventListener('mousedown', () => {
                clearInterval(fall);
                packet.style.borderColor = 'red';
                packet.innerText = 'FIX';
                setTimeout(() => packet.remove(), 100);
            });
        };

        const updateStats = () => {
            scoreDisplay.innerText = `INTEGRITY: ${integrity}%`;
            if (integrity <= 0) {
                endGame('SYSTEM_BREACHED');
            }
        };

        const endGame = (msg) => {
            gameActive = false;
            clearInterval(spawnInterval);
            statusDisplay.innerHTML = `
                <h3 class="h3" style="color: red; margin-bottom: 20px;">${msg}</h3>
                <button id="restart-defense" class="btn-obsidian">RETRY_PROTOCOL</button>
            `;
            document.getElementById('restart-defense').addEventListener('click', startGame);
        };

        const startGame = () => {
            integrity = 100;
            gameActive = true;
            updateStats();
            statusDisplay.innerHTML = '';
            spawnInterval = setInterval(spawnPacket, 1000);
        };

        startBtn.addEventListener('click', startGame);
    }
});