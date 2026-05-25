/**
 * Vector Node Central Engine
 * Handcrafted Core Mechanics
 */

document.addEventListener("DOMContentLoaded", function() {
    initialize3DMechanics();
    initializeIntakeRouter();
});

function initialize3DMechanics() {
    const cardNode = document.getElementById("threeDCard");
    const gridNode = document.querySelector(".cyber-grid-3d");
    if (!cardNode) return; 

    const viewportContainer = document.body;

    viewportContainer.addEventListener("mousemove", function(event) {
        const widthHalf = window.innerWidth / 2;
        const heightHalf = window.innerHeight / 2;

        const mouseX = (event.clientX - widthHalf) / widthHalf;
        const mouseY = (event.clientY - heightHalf) / heightHalf;

        const maxTiltAngle = 7; 

        const rotationX = (mouseY * maxTiltAngle).toFixed(2);
        const rotationY = (-mouseX * maxTiltAngle).toFixed(2);

        // 3D Panel Tilt Perspective
        cardNode.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        
        // Multi-Layer Background Parallax Shift (Inverted Movement for Depth)
        if (gridNode) {
            const shiftX = (-mouseX * 20).toFixed(1);
            const shiftY = (-mouseY * 20).toFixed(1);
            gridNode.style.transform = `rotateX(60deg) translateZ(-200px) translateX(${shiftX}px) translateY(${shiftY}px)`;
        }
    });

    viewportContainer.addEventListener("mouseleave", function() {
        cardNode.style.transform = "rotateX(0deg) rotateY(0deg)";
        cardNode.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
        if (gridNode) {
            gridNode.style.transform = "rotateX(60deg) translateZ(-200px)";
            gridNode.style.transition = "transform 0.5s ease";
        }
    });
}

function engageService(tierName) {
    localStorage.setItem("target_operational_intent", tierName);
    window.location.href = "contact.html";
}

function initializeIntakeRouter() {
    const intakeForm = document.getElementById("secureIntakeForm");
    if (!intakeForm) return;

    const structuralIntent = localStorage.getItem("target_operational_intent");
    const selectionDropdown = document.getElementById("clientBranch");
    
    if (structuralIntent && selectionDropdown) {
        // Defensive loose string mapping to handle packages automatically
        if (structuralIntent.includes("Security")) {
            selectionDropdown.value = "Cyber Security Audit";
        } else if (structuralIntent.includes("Web")) {
            selectionDropdown.value = "Web Build Operation";
        } else if (structuralIntent.includes("Graphics") || structuralIntent.includes("Brand") || structuralIntent.includes("Identity")) {
            selectionDropdown.value = "Graphics Identity Suite";
        }
        
        // Clear intent cache state
        localStorage.removeItem("target_operational_intent");
    }
}