import { useState } from 'preact/hooks';

interface Props {
  defaultFeeCategory?: string;
  defaultAmount?: number;
  staticLinks?: { label: string; url: string; amount?: number }[];
}

export default function RazorpayCheckout({
  defaultFeeCategory = 'Quarterly Tuition Fee',
  defaultAmount = 7800,
  staticLinks = [],
}: Props) {
  const [feeCategory, setFeeCategory] = useState(defaultFeeCategory);
  const [amount, setAmount] = useState(defaultAmount);
  const [studentName, setStudentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCheckout = async (e: Event) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          feeCategory,
          studentName,
          parentEmail,
          parentPhone,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to initiate order. Please try direct payment links.');
      }

      const orderData = await res.json();

      // Check if Razorpay is loaded in window
      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'Social Baluni Public School',
          description: feeCategory,
          image: '/brand/sbps-logo.png',
          order_id: orderData.orderId,
          prefill: {
            name: studentName,
            email: parentEmail,
            contact: parentPhone,
          },
          theme: {
            color: '#A3262B',
          },
          handler: function (response: any) {
            setSuccess(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
          },
        };
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        // Fallback: Inform user mock order is ready or redirect to Razorpay static link
        const matchingLink = staticLinks.find((l) => l.label.includes(feeCategory));
        if (matchingLink) {
          window.location.href = matchingLink.url;
        } else {
          setSuccess(`Order initiated (${orderData.orderId}). Please complete payment via portal.`);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Payment initiation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="bg-paper-50 rounded-2xl border border-paper-300 p-6 sm:p-8 shadow-xs">
      <h3 class="text-xl font-serif font-bold text-ink mb-2">Instant Fee Checkout</h3>
      <p class="text-xs sm:text-sm text-paper-700 mb-6">
        Generate an encrypted Razorpay transaction order with instant receipt.
      </p>

      {error && (
        <div class="mb-4 p-3 rounded-lg bg-crimson-100 text-crimson-800 text-xs font-semibold">
          {error}
        </div>
      )}

      {success && (
        <div class="mb-4 p-4 rounded-lg bg-forest-100 text-forest-800 text-sm font-semibold">
          ✓ {success}
        </div>
      )}

      <form onSubmit={handleCheckout} class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-ink mb-1">Fee Type</label>
          <select
            class="w-full px-3 py-2 rounded-lg border border-paper-300 bg-white text-xs sm:text-sm outline-none"
            value={feeCategory}
            onChange={(e) => setFeeCategory((e.target as HTMLSelectElement).value)}
          >
            <option value="Nursery to Class V Tuition Fee">Nursery to Class V Tuition (₹7,800)</option>
            <option value="Class VI to VIII Tuition Fee">Class VI to VIII Tuition (₹8,550)</option>
            <option value="Class IX to X Tuition Fee">Class IX to X Tuition (₹9,150)</option>
            <option value="Class XI to XII Tuition Fee">Class XI to XII Tuition (₹10,050)</option>
            <option value="Registration Fee">One-time Admission Registration (₹1,000)</option>
          </select>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-ink mb-1">Student Name</label>
            <input
              type="text"
              required
              class="w-full px-3 py-2 rounded-lg border border-paper-300 bg-white text-xs sm:text-sm outline-none"
              placeholder="Student Name"
              value={studentName}
              onInput={(e) => setStudentName((e.target as HTMLInputElement).value)}
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-ink mb-1">Amount (₹)</label>
            <input
              type="number"
              required
              class="w-full px-3 py-2 rounded-lg border border-paper-300 bg-white text-xs sm:text-sm outline-none"
              value={amount}
              onInput={(e) => setAmount(Number((e.target as HTMLInputElement).value))}
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-ink mb-1">Parent Mobile</label>
            <input
              type="tel"
              required
              pattern="[0-9]{10}"
              class="w-full px-3 py-2 rounded-lg border border-paper-300 bg-white text-xs sm:text-sm outline-none"
              placeholder="10-digit mobile"
              value={parentPhone}
              onInput={(e) => setParentPhone((e.target as HTMLInputElement).value)}
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-ink mb-1">Parent Email</label>
            <input
              type="email"
              required
              class="w-full px-3 py-2 rounded-lg border border-paper-300 bg-white text-xs sm:text-sm outline-none"
              placeholder="Email for receipt"
              value={parentEmail}
              onInput={(e) => setParentEmail((e.target as HTMLInputElement).value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          class="w-full py-3 rounded-lg bg-crimson-700 text-white font-bold text-sm hover:bg-crimson-800 transition-colors shadow-xs cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Initiating Secure Gateway...' : `Proceed to Pay ₹${amount} →`}
        </button>
      </form>
    </div>
  );
}
