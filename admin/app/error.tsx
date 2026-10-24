"use client";
export default function ErrorPage({reset}:{reset:()=>void}){return <main id="main"><h1>Workspace unavailable</h1><p>No changes have been saved. Try again.</p><button onClick={reset}>Try again</button></main>;}
