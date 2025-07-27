// YouTube Music Player - Original Manual Play Version
class YouTubePlayer {
    constructor() {
        this.isPlaying = false; // Starts paused by default
        this.currentTime = 0;
        this.duration = 3620; // 1:00:20 in seconds
        this.playBtn = document.getElementById('playBtn');
        this.progressFill = document.querySelector('.progress-fill');
        this.currentTimeDisplay = document.querySelector('.current-time');
        this.totalTimeDisplay = document.querySelector('.total-time');
        this.youtubePlayer = document.getElementById('youtube-player');
        
        // Your YouTube video ID
        this.videoId = 'f02mOEt11OQ';
        this.youtubeEmbedUrl = `https://www.youtube.com/embed/${this.videoId}?enablejsapi=1&autoplay=0&loop=1&playlist=${this.videoId}&controls=0&mute=0`;
        
        this.progressTimer = null;
        this.init();
    }
    
    init() {
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.loadYouTubePlayer();
        this.updateTimeDisplays();
    }
    
    loadYouTubePlayer() {
        this.youtubePlayer.src = this.youtubeEmbedUrl;
        console.log('🎵 Loading YouTube music player (manual play)');
    }
    
    togglePlay() {
        const playIcon = this.playBtn.querySelector('.play-icon');
        const pauseIcon = this.playBtn.querySelector('.pause-icon');
        
        if (this.isPlaying) {
            this.pause();
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
        } else {
            this.play();
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        }
        
        this.isPlaying = !this.isPlaying;
    }
    
    play() {
        if (this.youtubePlayer && this.youtubePlayer.contentWindow) {
            try {
                this.youtubePlayer.contentWindow.postMessage(
                    '{"event":"command","func":"playVideo","args":""}', 
                    '*'
                );
            } catch (e) {
                console.log('YouTube play command failed:', e);
            }
        }
        
        this.startProgressTimer();
        document.querySelector('.track-cover').style.animation = 'pulse 2s ease-in-out infinite';
        console.log('▶️ Music started playing');
    }
    
    pause() {
        if (this.youtubePlayer && this.youtubePlayer.contentWindow) {
            try {
                this.youtubePlayer.contentWindow.postMessage(
                    '{"event":"command","func":"pauseVideo","args":""}', 
                    '*'
                );
            } catch (e) {
                console.log('YouTube pause command failed:', e);
            }
        }
        
        this.stopProgressTimer();
        document.querySelector('.track-cover').style.animation = '';
        console.log('⏸️ Music paused');
    }
    
    startProgressTimer() {
        this.stopProgressTimer();
        this.progressTimer = setInterval(() => {
            if (this.isPlaying) {
                this.currentTime += 1;
                if (this.currentTime >= this.duration) {
                    this.currentTime = 0;
                }
                this.updateProgress();
                this.updateTimeDisplays();
            }
        }, 1000);
    }
    
    stopProgressTimer() {
        if (this.progressTimer) {
            clearInterval(this.progressTimer);
            this.progressTimer = null;
        }
    }
    
    updateProgress() {
        const percentage = this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0;
        this.progressFill.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
    }
    
    updateTimeDisplays() {
        this.currentTimeDisplay.textContent = this.formatTime(this.currentTime);
        this.totalTimeDisplay.textContent = this.formatTime(this.duration);
    }
    
    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        } else {
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }
    }
}

// Enhanced Particle System
class ParticleEnhancer {
    constructor() {
        this.particles = document.querySelectorAll('.particle');
        this.snowflakes = document.querySelectorAll('.snowflake');
        this.enhanceParticles();
        this.enhanceSnowfall();
    }
    
    enhanceParticles() {
        this.particles.forEach((particle, index) => {
            const colors = ['#ff9a56', '#ff6b35', '#ff4757', '#ffa726', '#ff8a65'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.boxShadow = `0 0 ${Math.random() * 20 + 10}px ${randomColor}`;
            
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            particle.addEventListener('mouseenter', () => {
                particle.style.transform = 'scale(2)';
                particle.style.opacity = '1';
            });
            
            particle.addEventListener('mouseleave', () => {
                particle.style.transform = 'scale(1)';
                particle.style.opacity = '0.6';
            });
        });
    }
    
    enhanceSnowfall() {
        this.snowflakes.forEach((snowflake, index) => {
            snowflake.addEventListener('mouseenter', () => {
                snowflake.style.transform = 'scale(1.5)';
                snowflake.style.opacity = '1';
            });
            
            snowflake.addEventListener('mouseleave', () => {
                snowflake.style.transform = 'scale(1)';
                snowflake.style.opacity = '0.7';
            });
        });
    }
}

// Video Background Manager
class VideoManager {
    constructor() {
        this.video = document.querySelector('.background-video');
        this.init();
    }
    
    init() {
        if (this.video) {
            this.video.addEventListener('loadeddata', () => {
                console.log('✅ Background video loaded successfully');
                this.video.play().catch(err => {
                    console.log('Video autoplay prevented, will play on user interaction');
                });
            });
            
            this.video.addEventListener('error', () => {
                console.log('❌ Video failed to load, using fallback background');
                document.querySelector('.video-overlay').style.background = 
                    'linear-gradient(135deg, rgba(47, 20, 47, 0.8), rgba(75, 35, 27, 0.7), rgba(90, 45, 35, 0.6))';
            });
            
            document.addEventListener('click', () => {
                if (this.video.paused) {
                    this.video.play();
                }
            }, { once: true });
        }
    }
}

// Social Button Animations
class SocialAnimations {
    constructor() {
        this.setupSocialButtons();
    }
    
    setupSocialButtons() {
        const socialButtons = document.querySelectorAll('.social-btn');
        
        socialButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });
            
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 154, 86, 0.4)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s ease-out';
                ripple.style.left = e.clientX - button.getBoundingClientRect().left - 10 + 'px';
                ripple.style.top = e.clientY - button.getBoundingClientRect().top - 10 + 'px';
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.pointerEvents = 'none';
                
                button.style.position = 'relative';
                button.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Motivational Quote Cycler
class MotivationalQuotes {
    constructor() {
        this.quotes = [
            '"Every sunset brings the promise of a new dawn. Let the music guide your thoughts and inspire your next creation. 🌅"',
            '"In the rhythm of lo-fi beats, find the peace that fuels your creativity. 🎵"',
            '"Code by day, dream by night, and let the sunset vibes inspire both. ✨"',
            '"The best ideas come when your mind is calm and your heart is open. 💭"',
            '"Create not because you have to, but because you can\'t imagine not creating. 🎨"'
        ];
        this.currentQuote = 0;
        this.quotesElement = document.querySelector('.motivational-text');
        this.startQuoteCycle();
    }
    
    startQuoteCycle() {
        setInterval(() => {
            this.fadeToNewQuote();
        }, 10000);
    }
    
    fadeToNewQuote() {
        if (!this.quotesElement) return;
        
        this.quotesElement.style.opacity = '0';
        this.quotesElement.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            this.currentQuote = (this.currentQuote + 1) % this.quotes.length;
            this.quotesElement.textContent = this.quotes[this.currentQuote];
            
            this.quotesElement.style.opacity = '1';
            this.quotesElement.style.transform = 'translateY(0)';
        }, 300);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌅 Initializing Kifyie\'s Tavern - Manual play mode');
    
    new VideoManager();
    new YouTubePlayer();
    new ParticleEnhancer();
    new SocialAnimations();
    new MotivationalQuotes();
    
    console.log('✨ Kifyie\'s Tavern loaded! Click play button to start music.');
});

window.addEventListener('resize', () => {
    const particles = document.querySelectorAll('.particle, .snowflake');
    particles.forEach(particle => {
        particle.style.transition = 'all 0.3s ease';
    });
});
