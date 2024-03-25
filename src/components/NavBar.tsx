"use client"
import { useState } from 'react';
import { signIn } from 'next-auth/react'
import { signOut } from 'next-auth/react';
import Image from "next/image"
import { useRouter } from "next/navigation"



const Navbar = ({ currentUser }: any) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const closeDropdown = () => {
        setShowDropdown(false);
    };
    const router = useRouter()
    return (
        <nav className="flex justify-between items-center bg-white shadow-md p-4">
            <Image
                onClick={() => router.push("/")}
                className="navbar-logo"
                alt="logo image"
                width="50"
                height="50"
                src="/logo.png"
            />
            <div className="navbar-search flex items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-gray-200 rounded-md p-2 mr-2 focus:outline-none"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Search</button>
            </div>
            <div className="navbar-profile relative">
                <img
                    src={`${currentUser ? currentUser.image : "/picture.png"}`}
                    alt="Profile"
                    className="h-10 rounded-full cursor-pointer"
                    onClick={() => toggleDropdown()}
                />
                {showDropdown && (
                    <div className="absolute top-full right-0 bg-white shadow-md rounded-md mt-1" onClick={() => closeDropdown()}>
                        <ul className="py-1">
                            {
                                currentUser ? (
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer " onClick={() => signOut()}>Sign Out</li>
                                ) : (
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => signIn("github")}>Login</li>
                                )
                            }

                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
