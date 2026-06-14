import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return Response.json({ error: error.message }, { status: 409 });
    }

    if (!data.user) {
      return Response.json(
        { error: "Failed to create user" },
        { status: 400 }
      );
    }

    const profileData = {
      id: data.user.id,
      email: data.user.email,
      created_at: new Date().toISOString(),
    };

    const { error: insertError } = await supabase
      .from("profiles")
      .insert(profileData);

    if (insertError) {
      return Response.json(
        { error: "Failed to create profile" },
        { status: 500 }
      );
    }

    return Response.json({ data }, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
