import { NextResponse } from "next/server";
import getCurrentUser from "@/libs/getCurrentUser";
import prisma from "../../../../libs/prismadb"

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.error();
        }

        const body = await request.json();
        const { dueDate, title, description } = body;

        const todo = await prisma.todo.create({
            data: {
                title: title,
                dueDate: dueDate,
                description: description,
                userId: currentUser.id
            }
        });

        return NextResponse.json(todo);
    } catch (error) {
        console.error("Error creating todo:", error);
        return NextResponse.error();
    }
}
