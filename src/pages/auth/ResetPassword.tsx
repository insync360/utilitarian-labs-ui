import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Zap, Loader2, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    // Password validation rules
    const passwordValidations = {
        minLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
    };

    const isPasswordValid = Object.values(passwordValidations).every(Boolean);
    const passwordsMatch = password === confirmPassword && password.length > 0;

    useEffect(() => {
        // Check if user has valid recovery session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                toast({
                    variant: "destructive",
                    title: "Invalid or expired link",
                    description: "Please request a new password reset link.",
                });
                navigate("/forgot-password");
            }
        });
    }, [navigate, toast]);

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isPasswordValid) {
            toast({
                variant: "destructive",
                title: "Invalid password",
                description: "Please ensure your password meets all requirements.",
            });
            return;
        }

        if (!passwordsMatch) {
            toast({
                variant: "destructive",
                title: "Passwords don't match",
                description: "Please ensure both passwords are the same.",
            });
            return;
        }

        setLoading(true);

        const { error } = await supabase.auth.updateUser({
            password: password,
        });

        if (error) {
            toast({
                variant: "destructive",
                title: "Error resetting password",
                description: error.message,
            });
            setLoading(false);
        } else {
            toast({
                title: "Password updated",
                description: "Your password has been successfully reset.",
            });
            navigate("/login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center space-y-2">
                    <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center glow">
                            <Zap className="w-7 h-7 text-primary-foreground" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Reset your password</CardTitle>
                    <CardDescription>
                        Enter your new password below
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleResetPassword}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pr-10"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-muted-foreground" />
                                    )}
                                </Button>
                            </div>
                            {/* Password strength indicators */}
                            {password && (
                                <div className="space-y-1 mt-2">
                                    <p className="text-xs text-muted-foreground">Password must contain:</p>
                                    <div className="grid grid-cols-2 gap-1">
                                        <div className={`flex items-center gap-1 text-xs ${passwordValidations.minLength ? 'text-success' : 'text-muted-foreground'
                                            }`}>
                                            {passwordValidations.minLength ? (
                                                <CheckCircle2 className="h-3 w-3" />
                                            ) : (
                                                <XCircle className="h-3 w-3" />
                                            )}
                                            At least 8 characters
                                        </div>
                                        <div className={`flex items-center gap-1 text-xs ${passwordValidations.hasUpperCase ? 'text-success' : 'text-muted-foreground'
                                            }`}>
                                            {passwordValidations.hasUpperCase ? (
                                                <CheckCircle2 className="h-3 w-3" />
                                            ) : (
                                                <XCircle className="h-3 w-3" />
                                            )}
                                            Uppercase letter
                                        </div>
                                        <div className={`flex items-center gap-1 text-xs ${passwordValidations.hasLowerCase ? 'text-success' : 'text-muted-foreground'
                                            }`}>
                                            {passwordValidations.hasLowerCase ? (
                                                <CheckCircle2 className="h-3 w-3" />
                                            ) : (
                                                <XCircle className="h-3 w-3" />
                                            )}
                                            Lowercase letter
                                        </div>
                                        <div className={`flex items-center gap-1 text-xs ${passwordValidations.hasNumber ? 'text-success' : 'text-muted-foreground'
                                            }`}>
                                            {passwordValidations.hasNumber ? (
                                                <CheckCircle2 className="h-3 w-3" />
                                            ) : (
                                                <XCircle className="h-3 w-3" />
                                            )}
                                            Number
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="pr-10"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-muted-foreground" />
                                    )}
                                </Button>
                            </div>
                            {confirmPassword && (
                                <div className={`flex items-center gap-1 text-xs mt-1 ${passwordsMatch ? 'text-success' : 'text-destructive'
                                    }`}>
                                    {passwordsMatch ? (
                                        <CheckCircle2 className="h-3 w-3" />
                                    ) : (
                                        <XCircle className="h-3 w-3" />
                                    )}
                                    {passwordsMatch ? "Passwords match" : "Passwords don't match"}
                                </div>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={loading || !isPasswordValid || !passwordsMatch}
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Reset Password
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
