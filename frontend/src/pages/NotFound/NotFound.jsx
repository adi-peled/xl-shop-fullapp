import React from 'react'
import { Link } from 'react-router-dom';
import './NotFound.scss'

export function NotFound() {
    return (
        <section className="not-found">
            <h1>Not Found 404</h1>
            <Link className="flex" to="/">
                Go Home
            </Link>

        </section>
    )
}
