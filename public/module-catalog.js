'use strict';
window.CAMP_MODULE_CATALOG={
  "modules": [
    {
      "n": 1,
      "title": "Secrets, attackers & rules",
      "optional": false,
      "summary": "You intercept a message. Before trying to break it, decide exactly what the attacker knows and what winning means.",
      "read": "Ch. 1 §§1.1–1.4; Appendix A §A.3 as needed",
      "topics": [
        "Define the system and its Python inputs",
        "Build a threat model you can test",
        "Shift letters and search the Caesar key space",
        "From repeated substitutions to moving rotor state",
        "Public algorithms and precise assumptions",
        "Use a maintained authenticated-encryption interface"
      ]
    },
    {
      "n": 2,
      "title": "The perfect secret",
      "optional": false,
      "summary": "A ciphertext can be consistent with every possible message. Watch that promise collapse when one pad is used twice.",
      "read": "Ch. 2 §§2.1–2.3; Appendix A §A.3",
      "topics": [
        "What observing a ciphertext should change",
        "Count keys and represent byte XOR",
        "Turn counting into the secrecy statement",
        "Recover plaintext under pad reuse",
        "Sample the fresh pads the theorem requires",
        "Separate secrecy from controlled message edits"
      ]
    },
    {
      "n": 3,
      "title": "Random-looking is a claim",
      "optional": false,
      "summary": "A generator doubles as a suspect. Can your algorithm tell its output apart from uniform randomness?",
      "read": "Ch. 3 §§3.1–3.3; Appendix A §A.2",
      "topics": [
        "Replace unlimited attackers with feasible attackers",
        "Read negligible with the quantifiers intact",
        "Understand the generator domain and bit masks",
        "Calculate the distinguishing strategy and advantage",
        "Convert an encryption attacker into a PRG distinguisher",
        "Repair the observed bias and state the theorem’s limits"
      ]
    },
    {
      "n": 4,
      "title": "Play the encryption game",
      "optional": false,
      "summary": "You get to ask for encryptions before guessing a secret message. Deterministic encryption makes the comparison suspiciously easy.",
      "read": "Ch. 3 §§3.4–3.5",
      "topics": [
        "Why one ciphertext is not the whole story",
        "Specify the CPA oracle and challenge",
        "Exploit deterministic equality with AES-ECB",
        "Distinguish a PRF from a PRG and a permutation",
        "Build intuition for a randomized PRF encryption",
        "Implement and interpret the randomized replacement"
      ]
    },
    {
      "n": 5,
      "title": "Patterns & bit flips",
      "optional": false,
      "summary": "Repeated blocks leave footprints. Encryption can also let an attacker change a value without learning the key.",
      "read": "Ch. 3 §3.6; Ch. 7 §§7.2.1, 7.2.5 as a survey",
      "topics": [
        "Fix block sizes, key sizes, and input domains",
        "Derive ECB's visible equality pattern",
        "Trace CBC encryption, decryption, and IV editing",
        "Trace CTR state and reused-stream recovery",
        "Work out controlled changes to plaintext",
        "Match each failure to an authenticated defense"
      ]
    },
    {
      "n": 6,
      "title": "Make forgery fail",
      "optional": false,
      "summary": "An order arrives with a valid tag. It could be authentic and still be a replay of yesterday’s order.",
      "read": "Ch. 4 §§4.1–4.3; Ch. 6 §6.3 for HMAC",
      "topics": [
        "Integrity introduces a different adversarial goal",
        "Serialize a record and distinguish a digest from a MAC",
        "Build fixed-length intuition using a PRF",
        "Create and compare HMAC tags",
        "Replay valid records and protect freshness state",
        "Make tests cover acceptance as well as rejection"
      ]
    },
    {
      "n": 7,
      "title": "Encrypt. Authenticate. Reject.",
      "optional": false,
      "summary": "An attacker can feed modified ciphertexts to a receiver. Make every rejected packet an uninteresting dead end.",
      "read": "Ch. 5 §§5.1–5.4",
      "topics": [
        "Model the decryption oracle and learn PKCS7",
        "Recover an intermediate byte from padding feedback",
        "Grow the recovered suffix and confirm ambiguous hits",
        "Use AEAD encryption and decryption interfaces",
        "Verify before releasing plaintext",
        "Separate nonce reuse from replay"
      ]
    },
    {
      "n": 8,
      "title": "The birthday surprise",
      "optional": false,
      "summary": "Finding any matching pair is much easier than finding a match for one fixed target. Small hashes make that difference visible.",
      "read": "Ch. 6 §§6.1, 6.4, 6.6; survey §6.5 after the core work",
      "topics": [
        "Name the hash target and represent digest bytes",
        "Count pairs before applying the birthday approximation",
        "Find a truncated-hash collision with a dictionary",
        "Build and verify salted password records",
        "Hash applications need structure and assumptions",
        "Separate an ideal oracle from a real hash implementation"
      ]
    },
    {
      "n": 9,
      "title": "Agree on a secret",
      "optional": false,
      "summary": "Alice and Bob agree on a shared value over a public channel. Then Mallory steps between them and replaces the public values.",
      "read": "Ch. 9 §§9.1.1–9.1.4, 9.2.3–9.2.4, 9.3.1–9.3.2; Ch. 11 §11.3",
      "topics": [
        "Compute modular powers and inverses",
        "Groups specify which operations are legal",
        "Trace DH agreement and tiny exponent search",
        "Distinguish three hardness questions",
        "Active substitution defeats unauthenticated agreement",
        "Authenticate X25519 and derive application keys"
      ]
    },
    {
      "n": 10,
      "title": "Public keys, private pitfalls",
      "optional": false,
      "summary": "Textbook RSA decrypts correctly and still leaks structure. Use padding and a symmetric key to protect real messages.",
      "read": "Ch. 12 §§12.1–12.3, 12.4.1, 12.5.1, 12.5.4; revisit Ch. 9 §9.2",
      "topics": [
        "Validate RSA integers and factor the toy modulus",
        "A correct public transform can leak the candidate",
        "Derive the multiplicative edit",
        "Encrypt and decrypt with RSA-OAEP key objects",
        "Compare ElGamal and hybrid encryption",
        "Bind the complete envelope to a trusted sender"
      ]
    },
    {
      "n": 11,
      "title": "Who signed this?",
      "optional": false,
      "summary": "Anyone can verify a signature, but the verifying key must belong to the person you intended to trust.",
      "read": "Ch. 13 §§13.1–13.3, 13.4.2, 13.5.3, 13.6–13.7",
      "topics": [
        "Signatures separate signing from verification",
        "Sign and verify exact bytes with RSA-PSS",
        "Derive signing-nonce and private-key recovery",
        "Verify the signer’s trusted key binding",
        "Certificates need a validation policy",
        "Use maintained signing APIs in a live protocol"
      ]
    },
    {
      "n": 12,
      "title": "Your secure-message capstone",
      "optional": false,
      "summary": "Put the pieces together, then try to break the story you tell about them. Every security claim needs a model and a boundary.",
      "read": "Revisit Ch. 3–6 and Ch. 11–13 for the properties your design uses",
      "topics": [
        "Start the capstone with claims and adversary access",
        "Trace encryption and authenticated decryption",
        "Distinguish record edits from fresh sender impersonation",
        "Authenticate freshness before updating receiver state",
        "Test one security claim at a time",
        "Finish with a review that survives a new scenario"
      ]
    },
    {
      "n": 13,
      "title": "Where primitives come from",
      "optional": true,
      "summary": "Define an inversion experiment → distinguish inversion from predicting a bit → compute the inner product → inspect the permutation construction → track reduction access → reconnect with the PRG experiment.",
      "read": "Ch. 8 §§8.1–8.4; optional continuation §§8.5–8.8",
      "topics": [
        "One-wayness has a sampling experiment",
        "Difficult inversion can coexist with easy leakage",
        "Compute the hard-core inner-product predicate",
        "See the clean permutation case",
        "Follow the reduction's efficient subroutine",
        "Reconnect the reduction with the PRG experiment"
      ]
    },
    {
      "n": 14,
      "title": "Curves and faster attacks",
      "optional": true,
      "summary": "Specify the curve and its group → test points → compare exhaustive search with BSGS → trace a table match → compare factoring regimes → revisit trusted key exchange and nonce safety.",
      "read": "Ch. 9 §9.3.4; Ch. 10 §§10.1–10.2",
      "topics": [
        "An elliptic curve provides an algebraic group",
        "Check curve membership and representation",
        "Baby-step/giant-step changes exhaustive search",
        "Trace a complete baby-step/giant-step match",
        "Factoring has several algorithmic regimes",
        "Separate parameter attacks from nonce and identity failures"
      ]
    },
    {
      "n": 15,
      "title": "The quantum shift",
      "optional": true,
      "summary": "State the quantum resource model → separate Shor from Grover → identify the KEM interface → identify the signature interface → assess a hybrid composition → compare claims against primary standards.",
      "read": "Ch. 14; compare the NIST FIPS 203, 204, and 205 primary publications and their errata",
      "topics": [
        "Specify the quantum resource model",
        "Attach Shor and Grover to specific computational tasks",
        "Understand the KEM interface and current standards",
        "Signatures occupy a different row",
        "Hybrid migration needs an actual composition",
        "Compare migration claims against primary sources"
      ]
    },
    {
      "n": 16,
      "title": "Share a secret, add ciphertexts",
      "optional": true,
      "summary": "Fix plaintext and ciphertext domains → implement Paillier encryption/decryption → evaluate authorized ciphertext operations → define threshold sharing → reconstruct with field inverses → authenticate the chosen computation policy.",
      "read": "Ch. 15 §§15.2–15.3",
      "topics": [
        "Specify Paillier’s plaintext and ciphertext domains",
        "Encrypt and decrypt with Paillier’s L function",
        "Evaluate ciphertext addition and its policy boundary",
        "Threshold sharing is about access to a secret",
        "Reconstruct shares using field inverses",
        "Authenticate the chosen original-record policy"
      ]
    }
  ],
  "labs": 14,
  "pythonModules": 18,
  "codingExercises": 54
};
