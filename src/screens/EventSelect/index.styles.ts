import { StyleSheet } from 'react-native';
import { colors, radius, shadows, spacing } from '../../assets/style/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 24,
    backgroundColor: colors.bg, // #f5f0e8
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  dateChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ede6d8',
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radius.pill,
    gap: 6,
    marginBottom: 10,
  },
  dateChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.4,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  cardsContainer: {
    gap: 18,
    paddingBottom: 40,
  },
  cardsContainerLandscape: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  // ── SERVICE CARD ──────────────────────────────────────
  serviceCard: {
    backgroundColor: colors.card, // #faf7f0
    borderRadius: radius.xl,
    padding: 24,
    borderWidth: 1.5,
    borderColor: colors.border,
    justifyContent: 'space-between',
    minHeight: 180,
    ...shadows.md,
  },
  serviceCardActive: {
    borderColor: colors.borderGold,
    backgroundColor: '#ffffff',
  },
  serviceCardLandscape: {
    flex: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    gap: 6,
  },
  statusPillActive: {
    backgroundColor: colors.successBg,
    borderWidth: 1,
    borderColor: colors.successBorder,
  },
  statusPillUpcoming: {
    backgroundColor: 'rgba(181, 151, 58, 0.12)',
    borderWidth: 1,
    borderColor: colors.borderGold,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusDotActive: {
    backgroundColor: colors.success,
  },
  statusDotUpcoming: {
    backgroundColor: colors.gold,
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusTextActive: {
    color: colors.success,
  },
  statusTextUpcoming: {
    color: colors.goldDark,
  },
  cardDay: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },

  cardBody: {
    marginBottom: 20,
  },
  cardName: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  cardRoom: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0ebe0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.sm,
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  metaTextHighlight: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.goldDark,
  },

  // Card Footer
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: 14,
  },
  tapText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  actionArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(181, 151, 58, 0.12)',
    borderWidth: 1,
    borderColor: colors.borderGold,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;