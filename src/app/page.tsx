"use client"

import { signIn } from "next-auth/react";
import Button from "../components/ui/Button";

export default function Home() {

    const signInwihtgoogle = async () => {
       try{
           await signIn("google");

       }
       catch(err){
           console.log(err);
       }

    };

    return <button onClick={()=> signInwihtgoogle()}>Sign in with Google</button>;
}
