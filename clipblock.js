(function() {
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

    // Function to attach copy buttons to all code blocks
    function attachCopyButtons() {
        document.querySelectorAll('pre code').forEach(codeBlock => {
            const button = document.createElement('button');
            button.className = 'code-copy-button';
            button.innerHTML = buttonTemplate;

            button.addEventListener('click', function() {
                // Extract text from the code block, excluding the button itself
                const textToCopy = codeBlock.textContent
                    .replace(button.textContent, '')
                    .trim();

                // Copy text to clipboard
                navigator.clipboard.writeText(textToCopy);

                // Toggle success message
                const buttonContent = this.querySelector('.button-content');
                const successMessage = this.querySelector('.success-message');

                buttonContent.style.display = 'none';
                successMessage.style.display = 'flex';
                setTimeout(() => {
                    buttonContent.style.display = 'flex';
                    successMessage.style.display = 'none';
                }, 2000);
            });

            // Append the button to the code block
            codeBlock.appendChild(button);
        });
    }

    // Attach buttons once the DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachCopyButtons);
    } else {
        attachCopyButtons();
    }
})();
