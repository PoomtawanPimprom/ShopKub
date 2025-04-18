import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

//getReportById
export async function GET(request: NextRequest, props: { params: Promise<{ id: number }> }) {
    const params = await props.params;
    try {
        const reportId = Number(params.id)
        const data = await prisma.report.findUnique({
            where: { id: reportId },
            include: {
                product:{ select: { id: true, name: true } },
                user:{ select: { id: true, name: true } },
                reportCategory:true,
            }
        })
        return NextResponse.json(data)
    } catch (error: any) {
        console.log(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

export async function PUT(request: NextRequest, props: { params: Promise<{ id: number }> }) {
    const params = await props.params;
    try {
        const reportId = Number(params.id)
        const { comment, image, userId, productId } = await request.json();
        const data = await prisma.report.update({
            where: { id: reportId },
            data: {
                comment,
                userId,
                productId
            }
        })
        return NextResponse.json(data)
    } catch (error: any) {
        console.log(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: number }> }) {
    const params = await props.params;
    try {
        const reportId = Number(params.id)
        const data = await prisma.report.delete({ where: { id: reportId } })
        return NextResponse.json(data)
    } catch (error: any) {
        console.log(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}