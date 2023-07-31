import { NextResponse, NextRequest } from "next/server";

import { mapping } from "@/data/mapping";

export async function GET(request, { params }) {

    if (mapping.hasOwnProperty(params.email)) {
        return NextResponse.json(
            mapping[params.email]
        );
    }
    else {
        return NextResponse.json({ error: 'No such email' }, { status: 404 })
    }

}
