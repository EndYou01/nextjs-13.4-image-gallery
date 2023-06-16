import { UnsplashUser } from "@/models/unsplash-users";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Alert } from "@/components/bootstrap";
// import { cache } from "react";

interface PageProps {
    params: { username: string }
}


async function getUser(username: string): Promise<UnsplashUser> {
    const response = await fetch(`https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`)
    
    if (response.status === 404) notFound()

    return await response.json()
}

//  Use if you're not using the native fetch
// const getUserCached = cache(getUser)

export async function generateMetadata({ params: { username } }: PageProps): Promise<Metadata> {
    // const user = await getUserCached(username)
    const user = await getUser(username)

    return {
        title: ([user.first_name, user.last_name].filter(Boolean).join(" ") || user.username) + " - NextJS 13.4 Image Gallery",

    }
}

export default async function Page({ params: { username } }: PageProps) {
    // const user = await getUserCached(username)
    const user = await getUser(username)

    return (
        <div>
            <Alert>
                This profile page uses <strong> generateMetadata</strong> to set the page title dynamically from the API response.
            </Alert>
            <h1>{user.username}</h1>
            <p>First name: <strong>{user.first_name}</strong></p>
            <p>Last name: <strong>{user.last_name}</strong></p>
            <a href={`https://unsplash.com/${user.username}`}>Unsplash profile</a>
        </div>
    );
}
