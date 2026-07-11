import { StyleSheet } from 'react-native';

const dots = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 4,
    marginLeft: 8,
    alignItems: 'center',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#3d3020',
  },
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#8b7535',
  },
  mainContent: {
    flex: 1,
  },
  flashOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
  },

  // ── PORTRAIT ─────────────────────────────────────────
  portraitContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    gap: 28,
  },
  portraitBrand: {
    alignItems: 'center',
  },

  // ── LANDSCAPE ────────────────────────────────────────
  landscapeContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  landscapeBrand: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  landscapeFormContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 24,
  },

  // ── BRANDING ─────────────────────────────────────────
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logoIcon: {
    fontSize: 48,
    color: '#ffffff',
  },
  churchName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  nameLine: {
    width: 60,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 2,
    marginBottom: 10,
  },
  churchSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },

  // ── CARD ─────────────────────────────────────────────
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: 'rgba(50,42,15,0.88)',
    borderRadius: 20,
    padding: 28,
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
  },
  cardLandscape: {
    maxWidth: 360,
  },
  loginTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  loginSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.45)',
    marginBottom: 24,
  },

  // ── INPUTS ───────────────────────────────────────────
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  inputWrapperFocused: {
    borderColor: '#b5973a',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  inputIcon: {
    fontSize: 16,
    paddingLeft: 14,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 15,
    color: '#ffffff',
  },
  eyeBtn: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  eyeText: {
    fontSize: 16,
  },

  // ── BUTTON ───────────────────────────────────────────
  signInBtn: {
    backgroundColor: '#f5f0e8',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    flexDirection: 'row',
  },
  signInBtnLoading: {
    opacity: 0.85,
  },
  signInText: {
    color: '#3d3020',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // ── HINT ─────────────────────────────────────────────
  hintBox: {
    marginTop: 20,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  hintTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#b5973a',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  hintText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    fontFamily: 'monospace',
    marginBottom: 2,
  },
});

export { styles, dots };