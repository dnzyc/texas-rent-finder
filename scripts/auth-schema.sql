-- User profiles (auto-create via Supabase Auth trigger)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile, admin can view all
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admin can view all profiles" ON profiles FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM auth.users WHERE id = auth.uid() AND email = 'admin@example.com'
  )
);

-- Favorites/Wishlist
CREATE TABLE favorites (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  place_id INTEGER REFERENCES places(id) ON DELETE CASCADE,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, place_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites" ON favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own favorites" ON favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own favorites" ON favorites FOR DELETE USING (auth.uid() = user_id);

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
  email TEXT PRIMARY KEY,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed BOOLEAN DEFAULT FALSE
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert newsletter subs" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view subscribers" ON newsletter_subscribers FOR SELECT USING (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid())
);