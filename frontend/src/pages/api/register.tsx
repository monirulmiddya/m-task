// pages/api/register.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { name, username, email, password } = req.body;

        // Add your registration logic here (e.g., saving to a database)

        res.status(201).json({ message: "User registered successfully" });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
