import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../index"; // Your Express app instance

// to test that our server correctly identifies a user when a valid token is provided.
describe("Auth API Integration Tests", () => {
    it("should return 401 if no cookie is provided to /me", async () => {
        const res = await request(app).get("/api/auth/me");

        expect(res.status).toBe(401);
        expect(res.body.error).toBe("Not authorized");
    });

    it("should successfully login and return user data from /me", async () => {
        // 1. Log in with a known user (make sure this user exists in your DB!)
        const loginRes = await request(app).post("/api/auth/login").send({
            email: "seth@ordi.com",
            password: "securePassword123",
        });

        expect(loginRes.status).toBe(200);

        // 2. Grab the cookie from the 'set-cookie' header
        // Supertest returns an array of strings for cookies
        const cookie = loginRes.headers["set-cookie"];
        expect(cookie).toBeDefined();

        // 3. Send that cookie to the /me endpoint
        const meRes = await request(app)
            .get("/api/auth/me")
            .set("Cookie", cookie); // This simulates the browser's automatic behavior

        // console.log("meRes.body = ", meRes.body);

        expect(meRes.status).toBe(200);
        expect(meRes.body.user).toBeDefined();
        expect(meRes.body.user.email).toBe("seth@ordi.com");
    });
});
