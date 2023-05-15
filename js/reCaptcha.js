export async function reCaptcha() {
    const contactForm = document.querySelector('.contact__form');
    contactForm.addEventListener('submit', checkForm)

    async function checkForm(e) {
        e.preventDefault();
        const captchaMsg = document.querySelector('.captcha-msg');
        const captcha = document.querySelector('#g-recaptcha-response').value;

        const result = await fetch('/check-form', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ captcha })
        }).then(res => res.json()).then(data => {
            console.log(data.msg)
            // if (data.msg) this.submit();
            // else {
            //     captchaMsg.innerText = "Please check the captcha."
            // }
        })
    }
}