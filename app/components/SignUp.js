'use client';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSignUp = async () => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          console.log("User signed up:", userCredential.user);
        } catch (err) {
          setError(err.message);
        }
      };

      return (
        <Box>
          <Typography variant="h4">Sign Up</Typography>
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSignUp}>
            Sign Up
          </Button>
        </Box>
      );
}