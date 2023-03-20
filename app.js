require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json({ extended: false }));
app.post("/contact", (req, res) => {
    const { fname, email, message } = req.body;
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            to: "shahbajalam78@gmail.com",
            subject: `New message from ${fname}`,
            html: `
            <div
            style="
                font-family: sans-serif;
                border-radius: 15px;
                overflow: hidden;
            "
        >
            <div style="background-color: #44403c; padding: 1rem">
                <h3 style="margin: 0">Hi Shahbaj Alam,</h3>
            </div>
            <div>
                <h3
                    style="
                        background-color: #1e293b;
                        padding: 2rem 1rem;
                        margin: 0;
                        color: black;
                    "
                >
                   ${message}
                </h3>
                <p
                    style="
                        text-decoration: none;
                        margin: 0;
                        padding: 1rem;
                        background-color: #fecaca;
                        font-size: 1.1rem;
                    "
                >
                    ${email}
                </p>
            </div>
        </div>
            `,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) throw new Error(err);
            else res.status(201).json({ status: 201, info });
        });
    } catch (error) {
        res.status(401).json({ status: 401, error });
    }
});

app.listen(6969);
