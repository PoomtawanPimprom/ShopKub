import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

//getAllReportByUserId
export async function GET(request: NextRequest, props: { params: Promise<{ id: number }> }) {
    const params = await props.params;
    try {
        const userId =  Number(params.id)
        const data = await prisma.report.findMany({
            where: { userId: userId},
            include: {
                product: true,
                user:true,
                reportCategory:true,
                reportStatus:true,
            },
            orderBy:{ createdAt:'desc'}
        })
        return NextResponse.json(data)
    } catch (error: any) {
        console.log(error.message)
        return new NextResponse(error instanceof Error ? error.message : String(error), { status: 500 })
    }
}
