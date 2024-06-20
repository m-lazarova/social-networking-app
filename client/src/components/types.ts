export type MainNavigationProps = {
    isAuth: boolean;
    onOpenMobileNav: () => void;
    onLogout: () => void;
};

export type NavItemsProps = {
    id: string;
    text: string;
    link: string;
    auth: boolean;
}

export type Navigation = Partial<{
    isAuth: boolean;
    mobile: boolean;
    onChoose: () => void;
    onLogout: () => void;
    open: boolean;
  }>;

  export type AuthPageProps = {
    onLogin: (event: React.FormEvent, authData: any) => void;
    onSignup: (event: React.FormEvent, authData: any) => void;
    loading: boolean | null;
  };

  export type PageProps = {
    userId: string | null;
    token: string | null;
  };