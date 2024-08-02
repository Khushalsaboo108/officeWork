import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useAppSelector } from "../redux/store";

export function middleware(request: NextRequest) {
  const stateData = useAppSelector((state) => state.auth.authData.auth);

  console.log("stateData", stateData);

  const url = stateData;

  //   let isLogin = request.cookies.get("logged");
    // if (!stateData) {
    //   if (request.nextUrl.pathname.startsWith("/dashboard")) {
    //     return NextResponse.rewrite(new URL("/", request.url));
    //   }
    // }
  //     else{
  //     if(url.pathname === "/"){
  //         url.pathname = "/dashboard/home";
  //         return NextResponse.redirect(url);
  //     }
  //   }

  //   if (request.nextUrl.pathname.startsWith("/signin")) {
  //     return NextResponse.rewrite(new URL("/", request.url));
  //   }
}
