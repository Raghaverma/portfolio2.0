"use client"

import React, { Component, ErrorInfo, ReactNode } from "react"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ErrorBoundaryProps {
    children: ReactNode
    fallback?: ReactNode
    onError?: (error: Error, errorInfo: ErrorInfo) => void
    resetKeys?: Array<string | number>
}

interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
}

/**
 * Error Boundary component to catch and handle React errors gracefully
 * Wraps sections of the app to prevent entire app crashes
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = {
            hasError: false,
            error: null,
        }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        // Update state so the next render will show the fallback UI
        return {
            hasError: true,
            error,
        }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log error to console in development
        if (process.env.NODE_ENV === "development") {
            console.error("Error Boundary caught an error:", error, errorInfo)
        }

        // Call optional error handler
        this.props.onError?.(error, errorInfo)

        // In production, you might want to log to an error reporting service
        // e.g., Sentry, LogRocket, etc.
    }

    componentDidUpdate(prevProps: ErrorBoundaryProps) {
        // Reset error boundary when resetKeys change
        if (this.state.hasError && prevProps.resetKeys !== this.props.resetKeys) {
            this.setState({
                hasError: false,
                error: null,
            })
        }
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
        })
    }

    render() {
        if (this.state.hasError) {
            // Render custom fallback UI if provided
            if (this.props.fallback) {
                return this.props.fallback
            }

            // Default error UI
            return (
                <Card className="glass-card p-8 m-4 max-w-2xl mx-auto">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-destructive" />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold">Oops! Something went wrong</h2>
                            <p className="text-muted-foreground max-w-md">
                                We encountered an unexpected error. Don't worry, this has been logged and we'll look into it.
                            </p>
                        </div>

                        {process.env.NODE_ENV === "development" && this.state.error && (
                            <details className="w-full text-left">
                                <summary className="cursor-pointer text-sm font-mono text-muted-foreground hover:text-foreground transition-colors">
                                    Error Details (Development Only)
                                </summary>
                                <pre className="mt-4 p-4 bg-destructive/5 rounded-lg text-xs overflow-auto max-h-64 text-destructive">
                                    {this.state.error.toString()}
                                    {"\n"}
                                    {this.state.error.stack}
                                </pre>
                            </details>
                        )}

                        <div className="flex gap-3 pt-4">
                            <Button onClick={this.handleReset} variant="default">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Try Again
                            </Button>
                            <Button
                                onClick={() => window.location.reload()}
                                variant="outline"
                            >
                                Reload Page
                            </Button>
                        </div>

                        <p className="text-xs text-muted-foreground pt-4">
                            If this issue persists, please{" "}
                            <a
                                href="#contact"
                                className="text-primary hover:underline"
                            >
                                contact me
                            </a>
                            {" "}with details about what you were doing.
                        </p>
                    </div>
                </Card>
            )
        }

        return this.props.children
    }
}

/**
 * Simpler error boundary wrapper for smaller sections
 */
export function SectionErrorBoundary({
    children,
    sectionName = "this section",
}: {
    children: ReactNode
    sectionName?: string
}) {
    return (
        <ErrorBoundary
            fallback={
                <div className="p-8 text-center space-y-2">
                    <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">
                        Unable to load {sectionName}. Please refresh the page.
                    </p>
                </div>
            }
        >
            {children}
        </ErrorBoundary>
    )
}
