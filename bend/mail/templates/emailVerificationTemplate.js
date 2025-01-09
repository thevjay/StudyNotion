const otpTemplate = (otp) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>OTP Verification</title>
        <style>
            body {
                background-color: #f9f9f9;
                font-family: 'Arial', sans-serif;
                font-size: 16px;
                line-height: 1.5;
                color: #333;
                margin: 0;
                padding: 0;
            }

            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background: #fff;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                text-align: center;
            }

            .logo {
                max-width: 150px;
                margin: 0 auto 20px;
            }

            .header {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
                color: #007BFF;
            }

            .message {
                font-size: 18px;
                margin-bottom: 20px;
            }

            .otp {
                font-size: 28px;
                font-weight: bold;
                color: #FF5722;
                margin: 20px 0;
            }

            .cta {
                margin-top: 20px;
                display: inline-block;
                padding: 10px 25px;
                font-size: 16px;
                color: #fff;
                background-color: #28a745;
                text-decoration: none;
                border-radius: 5px;
            }

            .cta:hover {
                background-color: #218838;
            }

            .footer {
                margin-top: 20px;
                font-size: 14px;
                color: #666;
            }

            .footer a {
                color: #007BFF;
                text-decoration: none;
            }

            .footer a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Company Logo">
            <div class="header">Verify Your Account</div>
            <div class="message">Use the OTP below to complete your registration:</div>
            <div class="otp">${otp}</div>
            <a class="cta" href="https://your-website.com/verify">Verify Now</a>
            <div class="footer">
                <p>If you didn’t request this email, you can safely ignore it.</p>
                <p>Need help? Contact us at <a href="mailto:support@yourcompany.com">support@yourcompany.com</a>.</p>
            </div>
        </div>
    </body>
    
    </html>`;
};

module.exports = otpTemplate;
