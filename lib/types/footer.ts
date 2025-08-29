export interface FooterLink {
  label: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface SocialLink {
  name: string
  href: string
  icon: string
}

export interface ContactInfo {
  telephone: string[]
  email: string
}
