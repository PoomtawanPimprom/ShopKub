import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()


export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const productID = Number(params.id)
    try {
        const productData = await prisma.product.findUnique({ where: { id: productID,deletedAt: null }, include: { store: true } })
        return NextResponse.json(productData)
    } catch (error) {
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const productID = Number(params.id)
    try {
        const { name, price, description, image } = await request.json();
        const data = await prisma.product.update({
            where: { id: productID },
            data: {
                name: name,
                price: price,
                description: description,
                image: image,
            }
        });
        return NextResponse.json(data)
    } catch (error) {
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const productID = Number(params.id)
    try {
        await prisma.product.update({ where: { id: productID }, data: { deletedAt: new Date() } })

        await prisma.inventory.deleteMany({
            where: { productID: productID }
        })

        await prisma.cartItem.deleteMany({
            where:{productId:productID}
        })
        return NextResponse.json("deleted successfully")
    } catch (error) {
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}