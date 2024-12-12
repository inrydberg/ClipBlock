(function(global) {
    // Function that contains all the functionality
    function initCopyButtons() {
        // Injecting styles for the copy button and success message
        const style = document.createElement('style');
        style.textContent = `
            .code-copy-button {
                border: none;
                background: none;
                color: gray;
                cursor: pointer;
                display: flex;
                align-items: center;
                margin-top: 0.5em;
            }
            .button-content, .success-message {
                display: flex;
                align-items: center;
            }
            .success-message {
                display: none;
                color: green;
            }
        `;
        document.head.appendChild(style);

        // HTML template for the copy button and success message
        const buttonTemplate = `
            <span class="button-content">
                <img src="https://www.svgrepo.com/download/521581/copy.svg" width="16" height="16" alt="Copy Icon">
                <span style="margin-left: 5px;">Copy to clipboard</span>
            </span>
            <span class="success-message">
                <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" width="16" height="16" alt="Checkmark Icon">
                <span style="margin-left: 5px;">Copied!</span>
            </span>
        `;

        // Attach copy buttons to all code blocks
        document.querySelectorAll('pre code').forEach(codeBlock => {
            const button = document.createElement('button');
            button.className = 'code-copy-button';
            button.innerHTML = buttonTemplate;

            button.addEventListener('click', function() {
                const textToCopy = codeBlock.textContent
                    .replace(button.textContent, '')
                    .trim();
                navigator.clipboard.writeText(textToCopy);
                const buttonContent = this.querySelector('.button-content');
                const successMessage = this.querySelector('.success-message');

                buttonContent.style.display = 'none';
                successMessage.style.display = 'flex';
                setTimeout(() => {
                    buttonContent.style.display = 'flex';
                    successMessage.style.display = 'none';
                }, 2000);
            });

            codeBlock.appendChild(button);
        });
    }

    // Self-initialize when loaded as a script tag
    if (typeof global.document !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initCopyButtons);
        } else {
            initCopyButtons();
        }
    }

    // Make it available as a module export
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = initCopyButtons;
    } else if (typeof global !== 'undefined') {
        global.initCopyButtons = initCopyButtons;
    }
})(typeof window !== 'undefined' ? window : this);
