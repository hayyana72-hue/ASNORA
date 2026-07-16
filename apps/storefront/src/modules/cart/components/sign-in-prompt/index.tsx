import { Button, Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="luxury-card p-6 flex items-center justify-between">
      <div>
        <Heading level="h2" className="font-serif text-lg tracking-wider text-cream-200">
          Already have an account?
        </Heading>
        <Text className="font-body text-sm text-cream-200/50 mt-2">
          Sign in for a better experience.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="secondary" className="h-10 border-gold-400/30 text-gold-400 hover:bg-gold-400/10" data-testid="sign-in-button">
            Sign in
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
