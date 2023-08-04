import { NextResponse, NextRequest } from "next/server";

import { mapping } from "@/data/mapping";

export async function GET(request, { params }) {
    if (mapping.has(params.email)) {
        return NextResponse.json(
            mapping.get(params.email)
        );
    }
    else {
        return NextResponse.json({ error: 'No such email' }, { status: 404 })
    }

}
