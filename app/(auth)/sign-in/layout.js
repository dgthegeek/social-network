import { Html } from "next/document"

export const metadata = {
    title: "social-network",
    description: "a social network app"
}

export default function RootLayout({ children } ) {
    return (
        <html>
            <body>
                { children }
            </body>
        </html>
    )
}