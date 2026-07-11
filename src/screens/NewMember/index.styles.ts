import { StyleSheet } from 'react-native';

// ── DROPDOWN STYLES ──────────────────────────────────────
const dropdown = StyleSheet.create({
  wrapper: { position: 'relative', zIndex: 99 },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#c8b97a',
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: 'transparent',
  },
  buttonText: { fontSize: 13, color: '#444' },
  arrow: { fontSize: 10, color: '#b5973a' },
  menu: {
    position: 'absolute',
    top: 38,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0d9c8',
    borderRadius: 6,
    zIndex: 999,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0ebe0',
  },
  optionText: { fontSize: 13, color: '#444' },
  optionTextActive: { color: '#b5973a', fontWeight: '700' },
});

// ── MAIN STYLES ──────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f0e8',
  },
  pageHeader: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0d9c8',
    backgroundColor: '#f5f0e8',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3d3020',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  scrollContentLandscape: {
    padding: 12,
  },

  // ── LAYOUT ───────────────────────────────────────────
  twoCol: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },
  leftCol: {
    width: 200,
    gap: 16,
  },
  rightCol: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
    alignItems: 'flex-end',
  },
  colFlex1: { flex: 1 },
  colFlex2: { flex: 2 },

  // ── PHOTO ────────────────────────────────────────────
  photoBox: {
    backgroundColor: '#f0e8d0',
    borderWidth: 1.5,
    borderColor: '#c8b97a',
    borderStyle: 'dashed',
    borderRadius: 8,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  photoIcon: { fontSize: 36, marginBottom: 8 },
  photoLabel: { fontSize: 12, color: '#999' },

  // ── CARD ─────────────────────────────────────────────
  card: {
    backgroundColor: '#faf7f0',
    borderWidth: 1,
    borderColor: '#e0d9c8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3d3020',
    borderBottomWidth: 1,
    borderBottomColor: '#e0d9c8',
    paddingBottom: 8,
    marginBottom: 4,
  },

  // ── FORM ─────────────────────────────────────────────
  label: {
    fontSize: 11,
    color: '#888',
    marginBottom: 4,
    marginTop: 8,
  },
  req: { color: '#e74c3c' },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#c8b97a',
    paddingVertical: 6,
    paddingHorizontal: 4,
    fontSize: 14,
    color: '#333',
    backgroundColor: 'transparent',
  },
  inputMultiline: {
    height: 56,
    textAlignVertical: 'top',
  },

  // ── GENDER ───────────────────────────────────────────
  genderRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  genderBtn: {
    flex: 1,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: '#c8b97a',
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  genderBtnActive: {
    backgroundColor: '#b5973a',
    borderColor: '#b5973a',
  },
  genderText: { fontSize: 12, color: '#666', fontWeight: '600' },
  genderTextActive: { color: '#fff' },

  // ── CHIPS ────────────────────────────────────────────
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c8b97a',
    backgroundColor: 'transparent',
  },
  chipActive: {
    backgroundColor: '#b5973a',
    borderColor: '#b5973a',
  },
  chipText: { fontSize: 12, color: '#666', fontWeight: '600' },
  chipTextActive: { color: '#fff' },

  // ── LINK BUTTON ──────────────────────────────────────
  linkButton: {
    backgroundColor: '#e0d9c8',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 4,
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  linkButtonText: {
    fontSize: 12,
    color: '#5a4a20',
    fontWeight: '600',
  },

  // ── SUBMIT ───────────────────────────────────────────
  submitButton: {
    backgroundColor: '#b5973a',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
    elevation: 2,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  burger: {
  position: 'absolute',
  top: 16,
  left: 16,
  zIndex: 10,
  gap: 5,
  padding: 8,
},
burgerLine: {
  height: 2,
  width: 22,
  backgroundColor: '#3d3020',
  borderRadius: 2,
},
});

export { styles, dropdown };